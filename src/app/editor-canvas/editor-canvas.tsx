import styles from './editor-canvas.module.css';
import {CanvasChunk} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';
import {useContext, useEffect, useState} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {flashSwapContext} from '@/app/models/flash-swap-context';

export default function EditorCanvas() {
    const {fieldsMap} = useContext(editorContext);
    const canvases: React.ReactNode[] = [];
    const [flashSwap, setFlashSwap] = useState<boolean>(false);
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

    return (
        <flashSwapContext.Provider value={{flashSwap}}>
            <div className={styles['editor-canvas']}>
            <div className={styles['editor-canvas-elements']}>{canvases}</div>
            </div>
        </flashSwapContext.Provider>
    );
}