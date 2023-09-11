import {Color} from '@/app/services/color';

enum ZxColorNames {
    BLACK = 'black',
    BLUE = 'blue',
    RED = 'red',
    MAGENTA = 'magenta',
    GREEN = 'green',
    CYAN = 'cyan',
    YELLOW = 'yellow',
    WHITE = 'white',
}

export type ZxColors = {
    [key in ZxColorNames]: Color;
}

export interface ZxPalette {
    bright: ZxColors;
    dark: ZxColors;
}

class PulsarPalette implements ZxPalette {
    public bright = {
        [ZxColorNames.BLACK]: {r: 0, g: 0, b: 0, a: 1},
        [ZxColorNames.BLUE]: {r: 0, g: 0, b: 255, a: 1},
        [ZxColorNames.RED]: {r: 255, g: 0, b: 0, a: 1},
        [ZxColorNames.MAGENTA]: {r: 255, g: 0, b: 255, a: 1},
        [ZxColorNames.GREEN]: {r: 0, g: 255, b: 0, a: 1},
        [ZxColorNames.CYAN]: {r: 0, g: 255, b: 255, a: 1},
        [ZxColorNames.YELLOW]: {r: 255, g: 255, b: 0, a: 1},
        [ZxColorNames.WHITE]: {r: 255, g: 255, b: 255, a: 1},
    };
    public dark = {
        [ZxColorNames.BLACK]: {r: 0, g: 0, b: 0, a: 1},
        [ZxColorNames.BLUE]: {r: 0, g: 0, b: 205, a: 1},
        [ZxColorNames.RED]: {r: 205, g: 0, b: 0, a: 1},
        [ZxColorNames.MAGENTA]: {r: 205, g: 0, b: 205, a: 1},
        [ZxColorNames.GREEN]: {r: 0, g: 205, b: 0, a: 1},
        [ZxColorNames.CYAN]: {r: 0, g: 205, b: 205, a: 1},
        [ZxColorNames.YELLOW]: {r: 205, g: 205, b: 0, a: 1},
        [ZxColorNames.WHITE]: {r: 205, g: 205, b: 205, a: 1},
    };
}

export class PaletteProvider {
    public static getPalette(): ZxPalette {
        return new PulsarPalette();
    }
}