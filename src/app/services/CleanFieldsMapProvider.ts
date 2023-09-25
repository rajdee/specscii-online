import {ZxColorNames} from '@/app/models/zx-color-names';
import {CanvasField} from '@/app/models/canvas-field';

class CleanFieldsMapProvider {
    public get = ()=>{
        return Array(768).fill(null).map((_, index) => ({
            ink: ZxColorNames.BLACK,
            paper: ZxColorNames.WHITE,
            symbol: 0,
            bright: true,
            flash: false,
            x: index % 32,
            y: Math.floor(index / 32),
        } as CanvasField))
    }
}


export const cleanFieldsMapProvider = new CleanFieldsMapProvider();