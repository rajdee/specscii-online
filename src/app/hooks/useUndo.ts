import useEventListener from '@use-it/event-listener';
import { useAppDispatch, useAppSelector } from './useStore';

import { UndoHistory } from '@/app/models/undo-state';
import { CanvasField } from '@/app/models/canvas-field';


import { undoHistoryService } from '@/app/services/undo-history-service';
import { setUndoHistoryAction, setUndoStepNumberAction, undoSelector } from '@/app/store/Undo/undoSlice';
import { useCallback } from 'react';


type hookType = {
    fieldsMap: Array<CanvasField>
    setFieldsMap: (payload: Array<CanvasField>) => void
};


export const useUndo = ({
    fieldsMap,
    setFieldsMap
}: hookType
) => {

    const {
        undoHistory,
        undoStepNumber
    } = useAppSelector(undoSelector);
    const dispatch = useAppDispatch();



    const setUndoHistory = useCallback(
        (payload: UndoHistory) => dispatch(
            setUndoHistoryAction(payload)
        ), [dispatch]
    );

    const setUndoStepNumber = useCallback(
        (payload: number) => dispatch(
            setUndoStepNumberAction(payload)
        ), [dispatch]
    );

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
