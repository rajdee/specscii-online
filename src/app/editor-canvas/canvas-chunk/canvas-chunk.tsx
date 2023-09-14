import styles from './canvas-chunk.module.css';
import {symbolsProvider} from '@/app/services/symbols-provider';
import {useContext, useLayoutEffect, useRef} from 'react';
import {Color} from '@/app/models/color';
import {editorContext} from '@/app/models/editor-context';

interface Props {
    inkColor: Color,
    paperColor: Color,
    bright: boolean,
    flash: boolean,
    fieldNumber: number,
    symbolNumber: number
    changeField: (fieldNumber: number) => void
}

const width = 8;
const height = 8;
export const CanvasChunk = ({inkColor, paperColor, bright, flash, fieldNumber, symbolNumber, changeField}: Props) => {
    const {grid} = useContext(editorContext);

    const canvasRef = useRef(null);
    useLayoutEffect(() => {
        const symbol = symbolsProvider.getSymbol(symbolNumber);

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const imageData = context.createImageData(width, height);
        const data = imageData.data;
        if (symbol) {
            for (const row of Object.keys(symbol)) {
                for (const num of Object.keys(symbol[row])) {
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
    }, [inkColor, paperColor, bright, flash, symbolNumber]);
    const click = (event) => {
        event.preventDefault();
        if (!(event.pointerType === 'mouse') || (event.buttons === 1)) {
            changeField(fieldNumber);
        } else if (event.pointerType === 'touch') {
            changeField(fieldNumber);
        }
    };
    return <canvas
        onPointerMove={click}
        onClick={click}
        ref={canvasRef}
        className={`${styles['canvas-chunk']} ${grid ? styles['grid'] : ''}`}
        width={width}
        height={height}></canvas>;
};
