import styles from './editor-canvas.module.css';
import {CanvasChunk} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';
import {useContext, useEffect, useState} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {flashSwapContext} from '@/app/models/flash-swap-context';
import {undoHistoryContext} from '@/app/models/undo-context';
import {CanvasField} from '@/app/models/canvas-field';
import {undoHistoryService} from '@/app/services/undo-history-service';

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
                         canvasSymbol={field.symbol}
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
        undoHistoryService.writeHistoryStep(beforeFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory);
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