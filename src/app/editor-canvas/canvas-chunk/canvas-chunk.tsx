import styles from './canvas-chunk.module.css';
import Symbols from '@/app/services/symbols';
import {useEffect, useRef} from 'react';
import {Color} from '@/app/services/color';

interface Props {
    inkColor: Color,
    paperColor: Color,
    bright: boolean,
    flash: boolean,
    number: number
}

const width = 8;
const height = 8;
export const CanvasChunk = ({inkColor, paperColor, bright, flash, number}: Props) => {
    const symbol = Symbols.getSymbol(number);

    const canvasRef = useRef(null);
    useEffect(() => {
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
    }, []);

    return <canvas ref={canvasRef} className={styles['canvas-chunk']} width={width} height={height}></canvas>;
};
