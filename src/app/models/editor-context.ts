import { createContext } from 'react';
import { CanvasField } from '@/app/models/canvas-field';
import { SymbolsMode } from '@/app/models/symbols-mode';
import { ZxColorNames } from '@/app/models/zx-color-names';
import { EditorActions, EditorState } from './editor-state';


export type EditorContextValue = EditorState | EditorActions;


const defaultValue: EditorContextValue = {
    symbolsMode: 'symbols',
    setSymbolsMode: (symbolsMode: SymbolsMode) => {
    },
    symbol: 0,
    setSymbol: (symbol: number) => {
    },
    grid: false,
    setGrid: (grid: boolean | null) => {
    },
    ink: ZxColorNames.BLACK,
    setInk: (name: ZxColorNames | null) => {
    },
    paper: ZxColorNames.WHITE,
    setPaper: (name: ZxColorNames | null) => {
    },
    bright: true,
    setBright: (bright: boolean | null) => {
    },
    flash: false,
    setFlash: (flash: boolean | null) => {
    },
    fieldsMap: [] as Array<CanvasField>,
    setFieldsMap: ([]: Array<CanvasField>) => {
    },
};

export const editorContext = createContext<EditorContextValue>(defaultValue);
