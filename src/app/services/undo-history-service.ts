import {CanvasField} from '@/app/models/canvas-field';
import {UndoHistory} from '@/app/models/undo-state';
import {localStorageService} from '@/app/services/local-storage-service';

interface UndoHistoryMethodProps {
    fieldsMap: CanvasField[],
    fieldIndex: number,
    setFieldsMap: (fieldsMap: CanvasField[]) => void,
    undoStepNumber: number,
    setUndoStepNumber: (undoStepNumber: number) => void,
    undoHistory: UndoHistory,
    setUndoHistory: (undoHistory: UndoHistory) => void,
}


class UndoHistoryService {
    public writeHistoryStep = (
        fieldsMap: CanvasField[],
        fieldIndex: number,
        undoStepNumber: number,
        setUndoStepNumber: (undoStepNumber: number) => void,
        undoHistory: UndoHistory,
        setUndoHistory: (undoHistory: UndoHistory) => void,
    ) => {

        const stepHistory = {
            fieldIndex,
            field: fieldsMap[fieldIndex]
        };

        const maxSteps = 100;
        const newUndoHistory = undoStepNumber === undoHistory.length
            ? [...undoHistory]
            : [...undoHistory.slice(0, undoStepNumber)];

        newUndoHistory.push(stepHistory);

        if (newUndoHistory.length > maxSteps) {
            // slice is faster than shift
            newUndoHistory.slice(1);
            setUndoStepNumber(maxSteps);
        } else {
            setUndoStepNumber(undoStepNumber + 1);
        }

        setUndoHistory(newUndoHistory);
    };

    public undo = ({
        fieldsMap,
        fieldIndex,
        setFieldsMap,
        undoStepNumber,
        setUndoStepNumber,
        undoHistory,
        setUndoHistory
    }: UndoHistoryMethodProps) => {

        if (undoStepNumber === 0) {
            return;
        }

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
    };

    public redo = ({
        setFieldsMap,
        undoStepNumber,
        setUndoStepNumber,
        undoHistory,
    }: UndoHistoryMethodProps) => {

        if ((undoStepNumber + 1) < undoHistory.length) {
            const newFieldsMap = undoHistory[undoStepNumber + 1];
            setFieldsMap(newFieldsMap);
            localStorageService.setItem('fieldsMap', newFieldsMap);
            setUndoStepNumber(undoStepNumber + 1);
        }
    };
}

export const undoHistoryService = new UndoHistoryService();
