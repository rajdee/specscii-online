import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';


import {undoHistoryService} from '@/app/services/undo-history-service';
import {localStorageService} from '@/app/services/local-storage-service';

import { useUndo } from '@/app/hooks/useUndo';
import { useFieldsMap } from '@/app/hooks/useFieldsMap';


export const HistoryControls = () => {

    const {
        fieldsMap,
        setFieldsMap
    } = useFieldsMap();

    const {
        undoHistory,
        setUndoHistory,
        undoStepNumber,
        setUndoStepNumber
    } = useUndo({
        fieldsMap,
        setFieldsMap
    });

    const undo = () => {
        undoHistoryService.undo(fieldsMap, setFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory)
    };

    const redo = () => {
        undoHistoryService.redo(fieldsMap, setFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory)
    };

    const redoEnabled = (undoStepNumber + 1) < undoHistory.length;
    const undoEnabled = undoStepNumber > 0;

    return (
        <ButtonGroup
            fullWidth={true}
            variant="outlined"
            aria-label="outlined button group"
        >
            <Button
                startIcon={<UndoIcon fontSize="small"/>}
                disabled={!undoEnabled}
                onClick={undo}
            >
                Undo
            </Button>
            <Button
                startIcon={<RedoIcon fontSize="small"/>}
                disabled={!redoEnabled}
                onClick={redo}
            >
                Redo
            </Button>
        </ButtonGroup>
    );
};
