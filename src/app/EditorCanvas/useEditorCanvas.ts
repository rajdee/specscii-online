import { useEffect, useState } from 'react';

import { CanvasField } from '@/app/models/canvas-field';

import { useUndo } from '@/app/hooks/useUndo';
import { useFieldsMap } from '@/app/hooks/useFieldsMap';

import { undoHistoryService } from '@/app/services/undo-history-service';


export const useEditorCanvas = () => {
    const {
        fieldsMap,
        fieldIndex,
        setFieldsMap
    } = useFieldsMap();

    const {
        undoHistory,
        undoStepNumber,
        setUndoHistory,
        setUndoStepNumber
    } = useUndo({
        fieldsMap,
        setFieldsMap
    });

    const [flashSwap, setFlashSwap] = useState<boolean>(false);

    useEffect(
        () => {
            const interval = setInterval(
                () => {
                    setFlashSwap(flashSwap => !flashSwap);
                }, 320,
            );
            return () => {
                clearInterval(interval);
            };
        }, [],
    );

    const endCapturing = () => {
        undoHistoryService.writeHistoryStep(
            fieldsMap,
            fieldIndex,
            undoStepNumber,
            setUndoStepNumber,
            undoHistory,
            setUndoHistory
        );
    };

    return {
        fieldsMap,
        flashSwap,
        endCapturing,
    };
};
