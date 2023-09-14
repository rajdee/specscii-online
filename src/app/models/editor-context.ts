import {createContext} from 'react';
import {ZxColorNames} from '@/app/services/palette-provider';
const defaultValue = {
    symbol: 0,
    setSymbol: (number)=>{},
    grid: true,
    setGrid: (grid) => {},
    ink: ZxColorNames.BLACK,
    setInk: (ZxColorNames) => {},
    paper: ZxColorNames.WHITE,
    setPaper: (ZxColorNames) => {},
    bright: true,
    setBright: (boolean)=>{},
    flash: false,
    setFlash: (boolean)=>{},
    fieldsMap: [],
    setFieldsMap: ([]) => {},
};
export const editorContext = createContext(defaultValue);
