import {CanvasField} from '@/app/models/canvas-field';
import {UndoHistory} from '@/app/models/undo-context';

class UndoHistoryService {
    public writeHistoryStep = (
        fields: CanvasField[],
        undoStepNumber: number, setUndoStepNumber: (undoStepNumber: number) => void,
        undoHistory: UndoHistory, setUndoHistory: (undoHistory: UndoHistory) => void,
    ) => {
        const maxSteps = 100;
        const newUndoHistory = undoStepNumber === undoHistory.length ? undoHistory : undoHistory.slice(0, undoStepNumber);
        newUndoHistory.push(fields);

        if (newUndoHistory.length > maxSteps) {
            newUndoHistory.shift();
            setUndoStepNumber(maxSteps);
        } else {
            setUndoStepNumber(undoStepNumber + 1);
        }

        setUndoHistory(newUndoHistory);
    };
}

export const undoHistoryService = new UndoHistoryService();