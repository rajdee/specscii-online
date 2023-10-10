import {ZxColorNames} from '@/app/models/zx-color-names';

export const ZxColorCodes: { [key in ZxColorNames]: number } = {
    black: 0,
    blue: 1,
    red: 2,
    magenta: 3,
    green: 4,
    cyan: 5,
    yellow: 6,
    white: 7,
};

export const ZxColorIds: { [key: number]: ZxColorNames } = {
    0: ZxColorNames.BLACK,
    1: ZxColorNames.BLUE,
    2: ZxColorNames.RED,
    3: ZxColorNames.MAGENTA,
    4: ZxColorNames.GREEN,
    5: ZxColorNames.CYAN,
    6: ZxColorNames.YELLOW,
    7: ZxColorNames.WHITE,
};
