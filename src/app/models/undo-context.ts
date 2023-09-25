import {createContext} from 'react';
import {CanvasField} from '@/app/models/canvas-field';

export type UndoHistory = Array<Array<CanvasField>>;

export type UndoContextValue = {
    undoHistory: UndoHistory,
    setUndoHistory: (undoHistory: UndoHistory) => void,
    undoStepNumber: number | null,
    setUndoStepNumber: (undoStepNumber: number | null) => void,
}
const defaultValue: UndoContextValue = {
    undoHistory: [],
    setUndoHistory: (undoHistory: UndoHistory) => {
    },
    undoStepNumber: null,
    setUndoStepNumber: (undoStepNumber: number | null) => {
    },
};
export const undoHistoryContext = createContext<UndoContextValue>(defaultValue);
