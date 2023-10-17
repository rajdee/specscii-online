import { useEffect, useState } from 'react';

import { CanvasField } from '@/app/models/canvas-field';

import { useUndo } from '@/app/hooks/useUndo';
import { useFieldsMap } from '@/app/hooks/useFieldsMap';

import { undoHistoryService } from '@/app/services/undo-history-service';


export const useEditorCanvas = () => {
    const {
        fieldsMap,
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
    const [beforeFieldsMap, setBeforeFieldsMap] = useState<Array<CanvasField>>([]);

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

    const startCapturing = () => {
        setBeforeFieldsMap([...fieldsMap]);
    };

    const endCapturing = () => {
        undoHistoryService.writeHistoryStep(beforeFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory);
    };

    return {
        fieldsMap,
        flashSwap,
        startCapturing,
        endCapturing,
    };
};
