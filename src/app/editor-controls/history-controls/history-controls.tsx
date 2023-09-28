import {useContext} from 'react';
import {undoHistoryContext} from '@/app/models/undo-context';
import {editorContext} from '@/app/models/editor-context';
import {Button, ButtonGroup} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import {localStorageService} from '@/app/services/local-storage-service';

export const HistoryControls = () => {
    const {undoHistory, setUndoHistory, undoStepNumber, setUndoStepNumber} = useContext(undoHistoryContext);
    const {fieldsMap, setFieldsMap} = useContext(editorContext);

    const undo = () => {
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

    const redo = () => {
        if (undoStepNumber < undoHistory.length) {
            const newFieldsMap = undoHistory[undoStepNumber + 1];
            setFieldsMap(newFieldsMap);
            localStorageService.setItem('fieldsMap', newFieldsMap);
            setUndoStepNumber(undoStepNumber + 1);
        }
    };

    const redoEnabled = (undoStepNumber + 1) < undoHistory.length;
    const undoEnabled = undoStepNumber > 0;

    return <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button startIcon={<UndoIcon fontSize="small"/>} disabled={!undoEnabled} onClick={undo}>Undo</Button>
        <Button startIcon={<RedoIcon fontSize="small"/>} disabled={!redoEnabled} onClick={redo}>Redo</Button>
    </ButtonGroup>;
};