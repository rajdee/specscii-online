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

const width = 8;
const height = 8;
export const CanvasChunk = ({canvasInk, canvasPaper, canvasBright, canvasFlash, fieldNumber, symbolNumber}: Props) => {
    const {symbolsMode, symbol, ink, paper, fieldsMap, setFieldsMap, bright, flash} = useContext(editorContext);
    const [preview, setPreview] = useState<boolean>(false);
    const {flashSwap} = useContext(flashSwapContext);
    const {grid} = useContext(editorContext);

    const canvasRef = useRef(null);

    useLayoutEffect(() => {
        renderCanvas();
    }, [canvasInk, canvasPaper, canvasBright, canvasFlash, symbolNumber, flashSwap && (canvasFlash || preview), preview]);

    const changeField = (fieldNumber: number) => {
        if (fieldsMap[fieldNumber]) {
            const newInk = ink ? ink : fieldsMap[fieldNumber].ink;
            const newPaper = paper ? paper : fieldsMap[fieldNumber].paper;
            const newSymbol = symbolsMode !== 'ignore' ? symbol : fieldsMap[fieldNumber].symbol;
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
        const newInk = preview ? (ink || canvasInk) : canvasInk;
        const newPaper = preview ? (paper || canvasPaper) : canvasPaper;
        const newSymbol = preview ? (symbolsMode !== 'ignore' ? symbol : symbolNumber) : symbolNumber;
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
    };

    const click = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        changeField(fieldNumber);
    };

    const pointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        if ((event.pointerType === 'mouse' && event.buttons === 1) || event.pointerType === 'touch') {
            changeField(fieldNumber);
        }
    };

    const onMouseEnter = () => {
        setPreview(true);
    };
    const onMouseLeave = () => {
        setPreview(false);
    };
    return <canvas
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerMove={pointerMove}
        onClick={click}
        ref={canvasRef}
        className={`${styles['canvas-chunk']} ${grid ? styles['grid'] : ''}`}
        width={width}
        height={height}></canvas>;
};
