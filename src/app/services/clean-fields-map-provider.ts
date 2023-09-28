import {ZxColorNames} from '@/app/models/zx-color-names';
import {CanvasField} from '@/app/models/canvas-field';

class CleanFieldsMapProvider {
    public get = (ink: ZxColorNames = ZxColorNames.BLACK, paper: ZxColorNames = ZxColorNames.WHITE, bright: boolean = true, flash: boolean = false, symbol: number = 0) => {
        return Array(768).fill(null).map((_, index) => ({
            ink,
            paper,
            symbol,
            bright,
            flash,
            x: index % 32,
            y: Math.floor(index / 32),
        } as CanvasField));
    };
}

export const cleanFieldsMapProvider = new CleanFieldsMapProvider();