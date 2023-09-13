import {ZxColorNames} from '@/app/services/palette-provider';

export interface CanvasField {
    x: number,
    y: number,
    ink: ZxColorNames,
    paper: ZxColorNames,
    symbol: number,
    bright: boolean,
    flash: boolean
}