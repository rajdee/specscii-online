import {useLayoutEffect, useRef} from 'react';
import {symbolsProvider} from '@/app/services/symbols-provider';
import {paletteProvider, ZxColorNames, ZxColorTypes} from '@/app/services/palette-provider';
import styles from './symbol-selector.module.css';

interface SymbolSelectorProps {
    symbolNumber: number,
    selected: boolean,
    changeSymbol: (symbolNumber: number) => void
}

const width = 16;
const height = 16;
export const SymbolSelector = ({symbolNumber, selected, changeSymbol}: SymbolSelectorProps) => {
    const canvasRef = useRef(null);
    useLayoutEffect(() => {
        const symbol = symbolsProvider.getSymbol(symbolNumber);

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const inkColor = paletteProvider.getColor(ZxColorNames.BLACK, ZxColorTypes.BRIGHT);
        const paperColor = paletteProvider.getColor(ZxColorNames.WHITE, ZxColorTypes.BRIGHT);

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
    }, [symbolNumber, selected]);
    const click = (event) => {
        event.preventDefault();
        if (!(event.pointerType === 'mouse') || (event.buttons === 1)) {
            changeSymbol(symbolNumber);
        } else if (event.pointerType === 'touch') {
            changeSymbol(symbolNumber);
        }
    };
    return <canvas
        onPointerMove={click}
        onClick={click}
        ref={canvasRef}
        className={styles['symbol-selector']}
        width={width}
        height={height}></canvas>;
};