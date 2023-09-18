import {createContext} from 'react';
import {CanvasField} from '@/app/models/canvas-field';
import {ZxColorNames} from '@/app/models/zx-color-names';
export type EditorContextValue = {
    symbol: number | null,
    setSymbol: (symbol: number | null) => void,
    grid: boolean,
    setGrid: (grid: boolean) => void,
    ink: ZxColorNames | null,
    setInk: (ink: ZxColorNames | null) => void,
    paper: ZxColorNames | null,
    setPaper: (paper: ZxColorNames | null) => void,
    bright:  boolean | null,
    setBright: (bright:  boolean | null) => void,
    flash:  boolean | null,
    setFlash: (flash:  boolean | null) => void,
    fieldsMap:  Array<CanvasField>,
    setFieldsMap: (fieldsMap:  Array<CanvasField>) => void,
}
const defaultValue:EditorContextValue = {
    symbol: 0,
    setSymbol: (symbolName: number | null)=>{},
    grid: true,
    setGrid: (grid: boolean) => {},
    ink: ZxColorNames.BLACK,
    setInk: (name: ZxColorNames | null) => {},
    paper: ZxColorNames.WHITE,
    setPaper: (name: ZxColorNames | null) => {},
    bright: true,
    setBright: (bright: boolean | null)=>{},
    flash: false,
    setFlash: (flash: boolean | null)=>{},
    fieldsMap: [] as Array<CanvasField>,
    setFieldsMap: ([]: Array<CanvasField>) => {},
};
export const editorContext = createContext<EditorContextValue>(defaultValue);
