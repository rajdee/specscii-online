import {FontSymbol, FontSymbolRow, symbolsProvider} from '@/app/services/symbols-provider';
import {paletteProvider} from '@/app/services/palette-provider';
import {ZxColorTypes} from '@/app/models/zx-color-types';
import {ZxColorNames} from '@/app/models/zx-color-names';

const width = 8;

class ImageDataCache {
    private cache = {} as { [key: string]: Uint8ClampedArray };

    public getImageData(data: Uint8ClampedArray, newSymbol: number, bright: boolean, inkName: ZxColorNames, paperName: ZxColorNames) {
        const key = `${newSymbol}-${bright}-${inkName}-${paperName}`;
        if (typeof this.cache[key] !== 'undefined') {
            return this.cache[key];
        }
        const paintedSymbol = symbolsProvider.getSymbol(newSymbol);
        if (paintedSymbol) {

            const inkColor = paletteProvider.getColor(inkName, bright ? ZxColorTypes.BRIGHT : ZxColorTypes.DARK);
            const paperColor = paletteProvider.getColor(paperName, bright ? ZxColorTypes.BRIGHT : ZxColorTypes.DARK);


            for (const rowStr of Object.keys(paintedSymbol)) {
                const row = Number(rowStr) as keyof FontSymbol;
                for (const numStr of Object.keys(paintedSymbol[row])) {
                    const num = Number(numStr) as keyof FontSymbolRow;
                    const byte = paintedSymbol[row][num];
                    const color = byte ? inkColor : paperColor;
                    const i = ((row * width) + +num) * 4;
                    data[i] = color.r;
                    data[i + 1] = color.g;
                    data[i + 2] = color.b;
                    data[i + 3] = color.a;
                }
            }
        } else {
            console.log('no symbol', newSymbol);
        }
        this.cache[key] = data;
        return data;
    }
}

export const imageDataCache = new ImageDataCache();