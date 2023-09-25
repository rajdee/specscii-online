import {useContext} from 'react';
import {undoHistoryContext} from '@/app/models/undo-context';
import {editorContext} from '@/app/models/editor-context';

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
        setFieldsMap(undoHistory[newStep]);
        setUndoStepNumber(newStep);
    };

    const redo = () => {
        if (undoStepNumber < undoHistory.length) {
            setFieldsMap(undoHistory[undoStepNumber + 1]);
            setUndoStepNumber(undoStepNumber + 1);
        }
    };

    const redoEnabled = (undoStepNumber + 1) < undoHistory.length;
    const undoEnabled = undoStepNumber > 0;

    return <div>
        <input type="button" value="Redo" disabled={!redoEnabled} onClick={redo}/>
        <input type="button" value="Undo" disabled={!undoEnabled} onClick={undo}/>
    </div>;
};