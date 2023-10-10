import {CanvasField} from '@/app/models/canvas-field';
import {SymbolsMode} from '@/app/models/symbols-mode';
import {ZxColorNames} from '@/app/models/zx-color-names';

export type FieldsMapType = {
    fieldsMap: Array<CanvasField>;
    setFieldsMap: (fieldsMap: Array<CanvasField>) => void;
}

export type EditorState = {
    bright: boolean | null;
    fieldsMap: FieldsMapType['fieldsMap'];
    flash: boolean | null;
    grid: boolean | null;
    ink: ZxColorNames | null;
    paper: ZxColorNames | null;
    symbol: number;
    symbolsMode: SymbolsMode;
}

export type EditorActions = {
    setBright: (bright: boolean | null) => void,
    setFieldsMap: FieldsMapType['setFieldsMap'],
    setFlash: (flash: boolean | null) => void,
    setGrid: (grid: boolean | null) => void,
    setInk: (ink: ZxColorNames | null) => void,
    setPaper: (paper: ZxColorNames | null) => void,
    setSymbol: (symbol: number) => void,
    setSymbolsMode: (symbolsMode: SymbolsMode) => void
}
