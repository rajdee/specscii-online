import { useState } from 'react';

import { UndoHistory } from '@/app/models/undo-context';
import { FieldsMapType } from '@/app/models/editor-state';

import { undoHistoryService } from '@/app/services/undo-history-service';
import useEventListener from '@use-it/event-listener';


export const useUndo = ({
    fieldsMap,
    setFieldsMap
}: FieldsMapType) => {

    const [undoHistory, setUndoHistory] = useState<UndoHistory>([] as UndoHistory);
    const [undoStepNumber, setUndoStepNumber] = useState<number>(0);


    const keyHandler = (event: KeyboardEvent) => {
        if (event.key === 'z' && event.ctrlKey) {
            undoHistoryService.undo(
                fieldsMap,
                setFieldsMap,
                undoStepNumber,
                setUndoStepNumber,
                undoHistory,
                setUndoHistory
            );
        } else if (event.key === 'y' && event.ctrlKey) {
            undoHistoryService.redo(
                fieldsMap,
                setFieldsMap,
                undoStepNumber,
                setUndoStepNumber,
                undoHistory,
                setUndoHistory);
        }
    };

    useEventListener('keydown', keyHandler);

    return {
        undoHistory,
        undoStepNumber,
        setUndoHistory,
        setUndoStepNumber
    };
};
