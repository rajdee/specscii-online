import { useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useAppDispatch, useAppSelector } from './useStore';

import { UndoHistory } from '@/app/models/undo-state';
import { CanvasField } from '@/app/models/canvas-field';


import { undoHistoryService } from '@/app/services/undo-history-service';
import { setUndoHistoryAction, setUndoStepNumberAction, undoSelector } from '@/app/store/Undo/undoSlice';


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

    useHotkeys(
        'ctrl+z, ctrl+y',
        (_, { keys = [] } = {}) => {
            const method = keys[0] === 'z'
                ? 'undo'
                : 'redo';

            undoHistoryService[method]({
                fieldsMap,
                setFieldsMap,
                undoStepNumber,
                setUndoStepNumber,
                undoHistory,
                setUndoHistory
            });
        }
    );

    const handleUndo = () => {
        undoHistoryService.undo({
            fieldsMap,
            setFieldsMap,
            undoStepNumber,
            setUndoStepNumber,
            undoHistory,
            setUndoHistory
        })
    };

    const handleRedo = () => {
        undoHistoryService.redo({
            fieldsMap,
            setFieldsMap,
            undoStepNumber,
            setUndoStepNumber,
            undoHistory,
            setUndoHistory
        })
    };

    return {
        undoHistory,
        undoStepNumber,
        isRedoDisabled: undoStepNumber + 1 === undoHistory.length,
        isUndoDisabled: undoStepNumber === 0,
        setUndoHistory,
        setUndoStepNumber,
        handleUndo,
        handleRedo
    };
};
