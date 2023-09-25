import {useContext} from 'react';
import {undoHistoryContext} from '@/app/models/undo-context';
import {editorContext} from '@/app/models/editor-context';

export const HistoryControls = () => {
    const {undoHistory, undoStepNumber, setUndoStepNumber} = useContext(undoHistoryContext);
    const {setFieldsMap} = useContext(editorContext);

    const undo = () => {
        if (undoStepNumber !== null) {
            console.log(undoHistory, undoStepNumber)
            // setFieldsMap(undoHistory[undoStepNumber]);
            // setUndoStepNumber(+undoStepNumber - 1);
        }
    };

    const redo = () => {
        if (undoStepNumber < undoHistory.length - 1) {
            setFieldsMap(undoHistory[undoStepNumber + 1]);
            setUndoStepNumber(+undoStepNumber + 1);
        }
    };

    const redoEnabled = undoStepNumber < undoHistory.length - 1;
    const undoEnabled = undoStepNumber !== null;

    return <div>
        <input type="button" value="Redo" disabled={!redoEnabled} onClick={redo}/>
        <input type="button" value="Undo" disabled={!undoEnabled} onClick={undo}/>
    </div>;
};