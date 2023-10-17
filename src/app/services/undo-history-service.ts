import {CanvasField} from '@/app/models/canvas-field';
import {UndoHistory} from '@/app/models/undo-state';
import {localStorageService} from '@/app/services/local-storage-service';

class UndoHistoryService {
    public writeHistoryStep = (
        fieldsMap: CanvasField[],
        undoStepNumber: number, setUndoStepNumber: (undoStepNumber: number) => void,
        undoHistory: UndoHistory, setUndoHistory: (undoHistory: UndoHistory) => void,
    ) => {
        const maxSteps = 100;
        const newUndoHistory = undoStepNumber === undoHistory.length
            ? [...undoHistory]
            : [...undoHistory.slice(0, undoStepNumber)];
        newUndoHistory.push(fieldsMap);

        if (newUndoHistory.length > maxSteps) {
            newUndoHistory.shift();
            setUndoStepNumber(maxSteps);
        } else {
            setUndoStepNumber(undoStepNumber + 1);
        }

        setUndoHistory(newUndoHistory);
    };
    public undo = (
        fieldsMap: CanvasField[], setFieldsMap: (fieldsMap: CanvasField[]) => void,
        undoStepNumber: number, setUndoStepNumber: (undoStepNumber: number) => void,
        undoHistory: UndoHistory, setUndoHistory: (undoHistory: UndoHistory) => void,
    ) => {
        if (undoStepNumber > 0) {
            if (undoStepNumber === undoHistory.length) {
                const newHistory = [...undoHistory];
                newHistory.push(fieldsMap);
                setUndoHistory(newHistory);
            }

            const newStep = undoStepNumber - 1;
            const newFieldsMap = undoHistory[newStep];
            setFieldsMap(newFieldsMap);
            localStorageService.setItem('fieldsMap', newFieldsMap);
            setUndoStepNumber(newStep);
        }
    };
    public redo = (
        fieldsMap: CanvasField[], setFieldsMap: (fieldsMap: CanvasField[]) => void,
        undoStepNumber: number, setUndoStepNumber: (undoStepNumber: number) => void,
        undoHistory: UndoHistory, setUndoHistory: (undoHistory: UndoHistory) => void,
    ) => {
        if ((undoStepNumber + 1) < undoHistory.length) {
            const newFieldsMap = undoHistory[undoStepNumber + 1];
            setFieldsMap(newFieldsMap);
            localStorageService.setItem('fieldsMap', newFieldsMap);
            setUndoStepNumber(undoStepNumber + 1);
        }
    };
}

export const undoHistoryService = new UndoHistoryService();
