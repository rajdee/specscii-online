import styles from './canvas-chunk.module.css';
import {FontSymbol, FontSymbolRow, symbolsProvider} from '@/app/services/symbols-provider';
import {useContext, useLayoutEffect, useRef, useState} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {paletteProvider} from '@/app/services/palette-provider';
import {ZxColorTypes} from '@/app/models/zx-color-types';
import {flashSwapContext} from '@/app/models/flash-swap-context';

interface Props {
    canvasInk: ZxColorNames,
    canvasPaper: ZxColorNames,
    canvasBright: boolean,
    canvasFlash: boolean,
    fieldNumber: number,
    symbolNumber: number
}

enum CanvasPosition {
    TOPLEFT,
    TOPRIGHT,
    BOTTOMLEFT,
    BOTTOMRIGHT
}

const width = 8;
const height = 8;
export const CanvasChunk = ({canvasInk, canvasPaper, canvasBright, canvasFlash, fieldNumber, symbolNumber}: Props) => {
    const {symbolsMode, symbol, ink, paper, fieldsMap, setFieldsMap, bright, flash} = useContext(editorContext);
    const [preview, setPreview] = useState<boolean>(false);
    const [canvasPosition, setCanvasPosition] = useState<CanvasPosition>(CanvasPosition.TOPLEFT);
    const {flashSwap} = useContext(flashSwapContext);
    const {grid} = useContext(editorContext);

    const canvasRef = useRef(null);
    const updateRequired = flashSwap && (canvasFlash || preview);

    const changeField = (quickCanvasPosition: CanvasPosition | null = null, reset = false) => {
        if (fieldsMap[fieldNumber]) {
            const newInk = ink ? ink : fieldsMap[fieldNumber].ink;
            const newPaper = paper ? paper : fieldsMap[fieldNumber].paper;
            const newSymbol =
                symbolsMode === 'blocks' ? changeSymbolToBlock(symbolNumber, quickCanvasPosition, reset) :
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
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('fieldsMap', JSON.stringify(newFieldsMap));
            }
        }
    };

    const renderCanvas = () => {
        const start = performance.now();
        const newInk = preview ? (ink || canvasInk) : canvasInk;
        const newPaper = preview ? (paper || canvasPaper) : canvasPaper;
        let newSymbol;
        if (symbolsMode === 'blocks') {
            newSymbol = preview ? changeSymbolToBlock(symbolNumber, canvasPosition) : symbolNumber;
        } else {
            newSymbol = preview ? (symbolsMode !== 'ignore' ? symbol : symbolNumber) : symbolNumber;
        }

        const newBright = preview ? (bright !== null ? bright : canvasBright) : canvasBright;
        const newFlash = preview ? (flash !== null ? flash : canvasFlash) : canvasFlash;

        const inkColor = paletteProvider.getColor(newInk, newBright ? ZxColorTypes.BRIGHT : ZxColorTypes.DARK);
        const paperColor = paletteProvider.getColor(newPaper, newBright ? ZxColorTypes.BRIGHT : ZxColorTypes.DARK);

        const paintedSymbol = symbolsProvider.getSymbol(newSymbol);
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const context = canvas.getContext('2d');
            if (context) {
                const imageData = context.createImageData(width, height);
                const data = imageData?.data;
                if (paintedSymbol && data) {
                    for (const rowStr of Object.keys(paintedSymbol)) {
                        const row = Number(rowStr) as keyof FontSymbol;
                        for (const numStr of Object.keys(paintedSymbol[row])) {
                            const num = Number(numStr) as keyof FontSymbolRow;
                            const byte = paintedSymbol[row][num];
                            const color = (!newFlash || !flashSwap) ? (byte ? inkColor : paperColor) : (byte ? paperColor : inkColor);
                            const i = ((row * width) + +num) * 4;
                            data[i] = color.r;
                            data[i + 1] = color.g;
                            data[i + 2] = color.b;
                            data[i + 3] = color.a;
                        }
                    }
                }
                context.putImageData(imageData, 0, 0);
            }
        }
        const end = performance.now();
        console.log(fieldNumber + ': ' + (end - start) + 'ms');
    };
    const contextMenu = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const quickCanvasPosition = (symbolsMode === 'blocks') ? detectCanvasPosition(event) : null;
        changeField(quickCanvasPosition, true);
    };
    const click = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const quickCanvasPosition = (symbolsMode === 'blocks') ? detectCanvasPosition(event) : null;
        changeField(quickCanvasPosition);
    };

    const pointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const quickCanvasPosition = (symbolsMode === 'blocks') ? detectCanvasPosition(event) : null;
        if ((event.pointerType === 'mouse' && (event.buttons === 1 || event.buttons === 2)) || event.pointerType === 'touch') {
            changeField(quickCanvasPosition, (event.buttons === 2));
        }
    };

    const onMouseEnter = (event: React.PointerEvent<HTMLCanvasElement>) => {
        if (symbolsMode === 'blocks') {
            detectCanvasPosition(event);
        }
        setPreview(true);
    };
    const onMouseLeave = () => {
        setPreview(false);
    };

    const detectCanvasPosition = (event: React.MouseEvent<HTMLCanvasElement>) => {
        let position = CanvasPosition.TOPLEFT;

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
            } else {
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
        renderCanvas();
    }, [canvasInk, canvasPaper, canvasBright, canvasFlash, symbolNumber, updateRequired, preview, canvasPosition]);


    return <canvas
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerMove={pointerMove}
        onClick={click}
        onContextMenu={contextMenu}
        ref={canvasRef}
        className={`${styles['canvas-chunk']} ${grid ? styles['grid'] : ''}`}
        width={width}
        height={height}></canvas>;
};
