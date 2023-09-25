import styles from './editor-canvas.module.css';
import {CanvasChunk} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';
import {useContext, useEffect, useState} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {flashSwapContext} from '@/app/models/flash-swap-context';
import {undoHistoryContext} from '@/app/models/undo-context';
import {CanvasField} from '@/app/models/canvas-field';

export default function EditorCanvas() {
    const {fieldsMap} = useContext(editorContext);
    const {undoHistory, setUndoHistory, undoStepNumber, setUndoStepNumber} = useContext(undoHistoryContext);
    const canvases: React.ReactNode[] = [];
    const [flashSwap, setFlashSwap] = useState<boolean>(false);
    const [beforeFieldsMap, setBeforeFieldsMap] = useState<Array<CanvasField>>([]);
    let fieldNumber = 0;
    fieldsMap.forEach(
        field => canvases.push(
            <CanvasChunk key={field.x + '-' + field.y}
                         canvasInk={field.ink}
                         canvasPaper={field.paper}
                         canvasBright={field.bright}
                         canvasFlash={field.flash}
                         fieldNumber={fieldNumber++}
                         symbolNumber={field.symbol}
            />,
        ),
    );

    useEffect(() => {
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
        const maxSteps = 100;
        const newUndoHistory = undoStepNumber === undoHistory.length ? undoHistory : undoHistory.slice(0, undoStepNumber);
        newUndoHistory.push(beforeFieldsMap);

        if (newUndoHistory.length > maxSteps) {
            newUndoHistory.shift();
            setUndoStepNumber(maxSteps);
        } else {
            setUndoStepNumber(undoStepNumber + 1);
        }

        setUndoHistory(newUndoHistory);
    };

    return (
        <flashSwapContext.Provider value={{flashSwap}}>
            <div className={styles['editor-canvas']}>
                <div onPointerDown={startCapturing} onPointerUp={endCapturing} onPointerCancel={endCapturing}
                     className={styles['editor-canvas-elements']}>{canvases}</div>
            </div>
        </flashSwapContext.Provider>
    );
}