import {CanvasField} from '@/app/models/canvas-field';

export type UndoHistory = Array<Array<CanvasField>>;

export type UndoStateValue = {
    undoHistory: UndoHistory,
    undoStepNumber: number,
}
