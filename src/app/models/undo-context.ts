import {createContext} from 'react';
import {CanvasField} from '@/app/models/canvas-field';

export type UndoHistory = Array<Array<CanvasField>>;

export type UndoContextValue = {
    undoHistory: UndoHistory,
    setUndoHistory: (undoHistory: UndoHistory) => void,
    undoStepNumber: number,
    setUndoStepNumber: (undoStepNumber: number) => void,
}
const defaultValue: UndoContextValue = {
    undoHistory: [],
    setUndoHistory: (undoHistory: UndoHistory) => {
    },
    undoStepNumber: 0,
    setUndoStepNumber: (undoStepNumber: number) => {
    },
};
export const undoHistoryContext = createContext<UndoContextValue>(defaultValue);
