import {CanvasField} from '@/app/models/canvas-field';
import {ZxColorCodes} from '@/app/models/zx-color-codes';
import {ZxColorNames} from '@/app/models/zx-color-names';

class ImageDataTransformer {
    public convertToTokens(fieldsData: CanvasField[]) {
        const data: Array<number> = [];
        let currentInk: ZxColorNames | null = null;
        let currentPaper: ZxColorNames | null = null;
        let currentFlash: boolean | null = null;
        let currentBright: boolean | null = null;
        fieldsData.forEach(
            (field) => {
                if (currentInk !== field.ink) {
                    currentInk = field.ink;
                    data.push(chr.INK, ZxColorCodes[field.ink]);
                }
                if (currentPaper !== field.paper) {
                    currentPaper = field.paper;
                    data.push(chr.PAPER, ZxColorCodes[field.paper]);
                }
                if (currentFlash !== field.flash) {
                    currentFlash = field.flash;
                    data.push(chr.FLASH, field.flash ? 1 : 0);
                }
                if (currentBright !== field.bright) {
                    currentBright = field.bright;
                    data.push(chr.BRIGHT, field.bright ? 1 : 0);
                }
                data.push(field.symbol + 32);
            },
        );
        return data;
    }
}

enum chr {
    INK = 16,
    PAPER = 17,
    FLASH = 18,
    BRIGHT = 19,
    INVERSE = 20,
    OVER = 21,
}


export const imageDataTransformer = new ImageDataTransformer();