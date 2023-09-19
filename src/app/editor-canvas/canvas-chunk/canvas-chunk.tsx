import styles from './canvas-chunk.module.css';
import {FontSymbol, FontSymbolRow, symbolsProvider} from '@/app/services/symbols-provider';
import {useContext, useLayoutEffect, useRef} from 'react';
import {Color} from '@/app/models/color';
import {editorContext} from '@/app/models/editor-context';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {paletteProvider} from '@/app/services/palette-provider';
import {ZxColorTypes} from '@/app/models/zx-color-types';

interface Props {
    ink: ZxColorNames,
    paper: ZxColorNames,
    bright: boolean,
    flash: boolean,
    fieldNumber: number,
    symbolNumber: number
    changeField: (fieldNumber: number) => void
}

const width = 8;
const height = 8;
export const CanvasChunk = ({ink, paper, bright, flash, fieldNumber, symbolNumber, changeField}: Props) => {
    const {grid} = useContext(editorContext);
    const inkColor = paletteProvider.getColor(ink, bright? ZxColorTypes.BRIGHT : ZxColorTypes.DARK);
    const paperColor = paletteProvider.getColor(paper, bright? ZxColorTypes.BRIGHT : ZxColorTypes.DARK)

    const canvasRef = useRef(null);
    useLayoutEffect(() => {
        const symbol = symbolsProvider.getSymbol(symbolNumber);
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const context = canvas.getContext('2d');
            if (context) {
                const imageData = context.createImageData(width, height);
                const data = imageData?.data;
                if (symbol && data) {
                    for (const rowStr of Object.keys(symbol)) {
                        const row = Number(rowStr) as keyof FontSymbol;
                        for (const numStr of Object.keys(symbol[row])) {
                            const num = Number(numStr) as keyof FontSymbolRow;
                            const byte = symbol[row][num];
                            const color = byte ? inkColor : paperColor;
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
    }, [inkColor, paperColor, bright, flash, symbolNumber]);

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
    return <canvas
        onPointerMove={pointerMove}
        onClick={click}
        ref={canvasRef}
        className={`${styles['canvas-chunk']} ${grid ? styles['grid'] : ''}`}
        width={width}
        height={height}></canvas>;
};
