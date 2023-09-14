import {createContext} from 'react';
import {ZxColorNames} from '@/app/services/palette-provider';
import {CanvasField} from '@/app/models/canvas-field';
const defaultValue = {
    symbol: 0,
    setSymbol: (symbolName: number)=>{},
    grid: true,
    setGrid: (grid: boolean) => {},
    ink: ZxColorNames.BLACK,
    setInk: (name: ZxColorNames) => {},
    paper: ZxColorNames.WHITE,
    setPaper: (name: ZxColorNames) => {},
    bright: true,
    setBright: (bright: boolean)=>{},
    flash: false,
    setFlash: (flash: boolean)=>{},
    fieldsMap: [] as Array<CanvasField>,
    setFieldsMap: ([]: Array<CanvasField>) => {},
};
export const editorContext = createContext(defaultValue);
