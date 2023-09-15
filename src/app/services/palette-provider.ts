import {Color} from '@/app/models/color';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {ZxColorTypes} from '@/app/models/zx-color-types';
import {ZxPalette} from '@/app/models/zx-palette';

const pulsarPalette: ZxPalette = {
    [ZxColorTypes.BRIGHT]: {
        [ZxColorNames.BLACK]: {r: 0, g: 0, b: 0, a: 255},
        [ZxColorNames.BLUE]: {r: 0, g: 0, b: 255, a: 255},
        [ZxColorNames.RED]: {r: 255, g: 0, b: 0, a: 255},
        [ZxColorNames.MAGENTA]: {r: 255, g: 0, b: 255, a: 255},
        [ZxColorNames.GREEN]: {r: 0, g: 255, b: 0, a: 255},
        [ZxColorNames.CYAN]: {r: 0, g: 255, b: 255, a: 255},
        [ZxColorNames.YELLOW]: {r: 255, g: 255, b: 0, a: 255},
        [ZxColorNames.WHITE]: {r: 255, g: 255, b: 255, a: 255},
    },
    [ZxColorTypes.DARK]: {
        [ZxColorNames.BLACK]: {r: 0, g: 0, b: 0, a: 255},
        [ZxColorNames.BLUE]: {r: 0, g: 0, b: 205, a: 255},
        [ZxColorNames.RED]: {r: 205, g: 0, b: 0, a: 255},
        [ZxColorNames.MAGENTA]: {r: 205, g: 0, b: 205, a: 255},
        [ZxColorNames.GREEN]: {r: 0, g: 205, b: 0, a: 255},
        [ZxColorNames.CYAN]: {r: 0, g: 205, b: 205, a: 255},
        [ZxColorNames.YELLOW]: {r: 205, g: 205, b: 0, a: 255},
        [ZxColorNames.WHITE]: {r: 205, g: 205, b: 205, a: 255},
    },
};


class PaletteProvider {
    public getPalette(): ZxPalette {
        return pulsarPalette;
    }

    public getColor(name: ZxColorNames, type: ZxColorTypes): Color {
        const palette = this.getPalette();
        return palette[type][name];
    }
}

export const paletteProvider = new PaletteProvider();