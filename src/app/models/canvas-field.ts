import {ZxColorNames} from '@/app/models/zx-color-names';

export interface CanvasField {
    x: number,
    y: number,
    ink: ZxColorNames,
    paper: ZxColorNames,
    symbol: number,
    bright: boolean,
    flash: boolean
}