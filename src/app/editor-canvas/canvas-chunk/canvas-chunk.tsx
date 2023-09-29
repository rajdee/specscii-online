import styles from './canvas-chunk.module.css';
import {useContext, useLayoutEffect, useRef, useState} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {paletteProvider} from '@/app/services/palette-provider';
import {ZxColorTypes} from '@/app/models/zx-color-types';
import {flashSwapContext} from '@/app/models/flash-swap-context';
import {localStorageService} from '@/app/services/local-storage-service';
import {imageDataCache} from '@/app/services/image-data-cache';

interface Props {
    canvasInk: ZxColorNames,
    canvasPaper: ZxColorNames,
    canvasBright: boolean,
    canvasFlash: boolean,
    fieldNumber: number,
    canvasSymbol: number
}

enum CanvasPosition {
    TOPLEFT,
    TOPRIGHT,
    BOTTOMLEFT,
    BOTTOMRIGHT
}

const width = 8;
const height = 8;
export const CanvasChunk = ({canvasInk, canvasPaper, canvasBright, canvasFlash, fieldNumber, canvasSymbol}: Props) => {
    const {
        symbolsMode,
        symbol,
        setSymbol,
        ink,
        setInk,
        paper,
        setPaper,
        fieldsMap,
        setFieldsMap,
        bright,
        setBright,
        flash,
        setFlash,
    } = useContext(editorContext);
    const [preview, setPreview] = useState<boolean>(false);
    const [canvasPosition, setCanvasPosition] = useState<CanvasPosition | null>(null);
    const {flashSwap} = useContext(flashSwapContext);
    const {grid} = useContext(editorContext);

    const canvasRef = useRef(null);
    const updateRequired = flashSwap && (canvasFlash || preview);

    const changeField = (quickCanvasPosition: CanvasPosition | null = null, reset = false) => {
        if (fieldsMap[fieldNumber]) {
            const newInk = ink ? ink : fieldsMap[fieldNumber].ink;
            const newPaper = paper ? paper : fieldsMap[fieldNumber].paper;
            const newSymbol =
                symbolsMode === 'blocks' ? changeSymbolToBlock(canvasSymbol, quickCanvasPosition, reset) :
                    symbolsMode === 'symbols' ? symbol :
                        fieldsMap[fieldNumber].symbol;
            const newBright = bright !== null ? bright : fieldsMap[fieldNumber].bright;
            const newFlash = flash !== null ? flash : fieldsMap[fieldNumber].flash;
            const newFieldsMap = [...fieldsMap];
            newFieldsMap[fieldNumber] = {
                ...newFieldsMap[fieldNumber],
                ink: newInk,
                paper: newPaper,
                symbol: newSymbol,
                bright: newBright,
                flash: newFlash,
            };
            setFieldsMap(newFieldsMap);
            localStorageService.setItem('fieldsMap', newFieldsMap);
        }
    };

    const contextMenu = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        if (symbolsMode === 'blocks') {
            changeField(detectCanvasPosition(event), true);
        }
    };
    const click = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const quickCanvasPosition = (symbolsMode === 'blocks') ? detectCanvasPosition(event) : null;

        changeField(quickCanvasPosition);
    };
    const readFieldSettings = () => {
        setInk(canvasInk);
        setPaper(canvasPaper);
        setSymbol(canvasSymbol);
        setBright(canvasBright);
        setFlash(canvasFlash);
    };

    const pointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const quickCanvasPosition = (symbolsMode === 'blocks') ? detectCanvasPosition(event) : null;
        if (
            event.pointerType === 'mouse' && (event.buttons === 1 || (event.buttons === 2 && symbolsMode === 'blocks')) ||
            event.pointerType === 'touch'
        ) {
            changeField(quickCanvasPosition, (event.buttons === 2));
        }
        if (event.pointerType === 'mouse' && event.buttons === 4) {
            readFieldSettings();
        }
    };

    const pointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        if (event.buttons === 4) {
            readFieldSettings();
        }
    };

    const onMouseEnter = (event: React.PointerEvent<HTMLCanvasElement>) => {
        setPreview(true);
    };
    const onMouseLeave = () => {
        setPreview(false);
    };

    const detectCanvasPosition = (event: React.MouseEvent<HTMLCanvasElement>) => {
        let position = null;

        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;

            const halfWidth = canvas.offsetWidth / 2;
            const halfHeight = canvas.offsetHeight / 2;

            const isLeft = event.nativeEvent.offsetX < halfWidth;
            const isTop = event.nativeEvent.offsetY < halfHeight;

            if (isLeft && isTop) {
                position = CanvasPosition.TOPLEFT;
            } else if (!isLeft && isTop) {
                position = CanvasPosition.TOPRIGHT;
            } else if (isLeft && !isTop) {
                position = CanvasPosition.BOTTOMLEFT;
            } else if (!isLeft && !isTop) {
                position = CanvasPosition.BOTTOMRIGHT;
            }
        }
        setCanvasPosition(position);
        return position;
    };

    const changeSymbolToBlock = (symbol: number, canvasPosition: CanvasPosition | null, reset = false): number => {
        const offset = 32 * 3;
        let newSymbol = 0;
        switch (canvasPosition) {
            case CanvasPosition.TOPRIGHT:
                if (reset) {
                    newSymbol = (symbol > offset) ? (symbol & ~1) : 0;
                } else {
                    newSymbol = (symbol > offset) ? (symbol | 1) : offset + 1;
                }
                break;
            case CanvasPosition.TOPLEFT:
                if (reset) {
                    newSymbol = (symbol > offset) ? (symbol & ~2) : 0;
                } else {
                    newSymbol = (symbol > offset) ? (symbol | 2) : offset + 2;
                }
                break;
            case CanvasPosition.BOTTOMRIGHT:
                if (reset) {
                    newSymbol = (symbol > offset) ? (symbol & ~4) : 0;
                } else {
                    newSymbol = (symbol > offset) ? (symbol | 4) : offset + 4;
                }
                break;
            case CanvasPosition.BOTTOMLEFT:
                if (reset) {
                    newSymbol = (symbol > offset) ? (symbol & ~8) : 0;
                } else {
                    newSymbol = (symbol > offset) ? (symbol | 8) : offset + 8;
                }
                break;
        }
        return newSymbol;
    };

    useLayoutEffect(() => {
        const newInk = preview ? (ink || canvasInk) : canvasInk;
        const newPaper = preview ? (paper || canvasPaper) : canvasPaper;
        let newSymbol;
        if (symbolsMode === 'blocks') {
            newSymbol = preview ? changeSymbolToBlock(canvasSymbol, canvasPosition) : canvasSymbol;
        } else {
            newSymbol = preview ? (symbolsMode !== 'ignore' ? symbol : canvasSymbol) : canvasSymbol;
        }

        const newBright = preview ? (bright !== null ? bright : canvasBright) : canvasBright;
        const newFlash = preview ? (flash !== null ? flash : canvasFlash) : canvasFlash;

        const flashActive = (!newFlash || !flashSwap);
        const flashedInk = flashActive ? newInk : newPaper;
        const flashedPaper = flashActive ? newPaper : newInk;

        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const context = canvas.getContext('2d');
            if (context) {
                const imageData = context.createImageData(width, height);
                const data = imageData?.data;
                if (newSymbol !== undefined && data) {
                    imageData.data.set(imageDataCache.getImageData(data, newSymbol, newBright, flashedInk, flashedPaper));
                }
                context.putImageData(imageData, 0, 0);
            }
        }
    }, [canvasInk, canvasPaper, canvasBright, canvasFlash, canvasSymbol, updateRequired, preview, canvasPosition]);


    return <canvas
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerMove={pointerMove}
        onPointerDown={pointerDown}
        onClick={click}
        onContextMenu={contextMenu}
        ref={canvasRef}
        className={`${styles['canvas-chunk']} ${grid === true ? styles['grid'] : ''}  ${grid === false ? styles['grid-dashed'] : ''}`}
        width={width}
        height={height}></canvas>;
};
