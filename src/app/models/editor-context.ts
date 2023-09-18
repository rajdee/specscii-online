import {createContext} from 'react';
import {CanvasField} from '@/app/models/canvas-field';
import {ZxColorNames} from '@/app/models/zx-color-names';
const defaultValue = {
    symbol: 0 | null,
    setSymbol: (symbolName: number | null)=>{},
    grid: true,
    setGrid: (grid: boolean) => {},
    ink: ZxColorNames.BLACK | null,
    setInk: (name: ZxColorNames | null) => {},
    paper: ZxColorNames.WHITE | null,
    setPaper: (name: ZxColorNames | null) => {},
    bright: true | null,
    setBright: (bright: boolean | null)=>{},
    flash: false | null,
    setFlash: (flash: boolean | null)=>{},
    fieldsMap: [] as Array<CanvasField>,
    setFieldsMap: ([]: Array<CanvasField>) => {},
};
export const editorContext = createContext(defaultValue);
