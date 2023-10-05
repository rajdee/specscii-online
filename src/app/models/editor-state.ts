import { CanvasField } from '@/app/models/canvas-field';
import { SymbolsMode } from '@/app/models/symbols-mode';
import { ZxColorNames } from '@/app/models/zx-color-names';

export type FieldsMapType = {
    fieldsMap: Array<CanvasField>;
    setFieldsMap: (fieldsMap: Array<CanvasField>) => void;
}

export type EditorState = {
    symbolsMode: SymbolsMode;
    symbol: number;
    grid: boolean | null;
    ink: ZxColorNames | null;
    paper: ZxColorNames | null;
    bright: boolean | null;
    flash: boolean | null;
    fieldsMap: FieldsMapType['fieldsMap'];
}

export type EditorActions = {
    setSymbolsMode: (symbolsMode: SymbolsMode) => void,
    setSymbol: (symbol: number) => void,
    setGrid: (grid: boolean | null) => void,
    setInk: (ink: ZxColorNames | null) => void,
    setPaper: (paper: ZxColorNames | null) => void,
    setBright: (bright: boolean | null) => void,
    setFlash: (flash: boolean | null) => void,
    setFieldsMap: FieldsMapType['setFieldsMap']
}
