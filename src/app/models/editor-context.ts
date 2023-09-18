import {createContext} from 'react';
import {CanvasField} from '@/app/models/canvas-field';
import {ZxColorNames} from '@/app/models/zx-color-names';
export type EditorContextValue = {
    symbol: number | null,
    setSymbol: CallableFunction,
    grid: boolean,
    setGrid: CallableFunction,
    ink: ZxColorNames.BLACK,
    setInk: CallableFunction,
    paper: ZxColorNames.WHITE,
    setPaper: CallableFunction,
    bright:  boolean | null,
    setBright: CallableFunction,
    flash:  boolean | null,
    setFlash: CallableFunction,
    fieldsMap:  Array<CanvasField>,
    setFieldsMap: CallableFunction,
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
