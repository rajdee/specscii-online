import { useEditorCanvas } from './useEditorCanvas';

import { CanvasChunk } from '@/app/EditorCanvas/CanvasChunk';

import styles from './editor-canvas.module.css';


export default function EditorCanvas() {
    const {
        fieldsMap,
        flashSwap,
        startCapturing,
        endCapturing,
    } = useEditorCanvas();

    return (
        <div className={styles['editor-canvas']}>
            <div
                className={styles['editor-canvas-elements']}
                onPointerUp={endCapturing}
                onPointerDown={startCapturing}
                onPointerCancel={endCapturing}
            >
                {
                    fieldsMap.map((field, index) => (
                        <CanvasChunk
                            key={field.x + '-' + field.y}
                            canvasInk={field.ink}
                            canvasPaper={field.paper}
                            canvasBright={field.bright}
                            canvasFlash={field.flash}
                            fieldNumber={index}
                            flashSwap={flashSwap}
                            canvasSymbol={field.symbol}
                        />
                    ))
                }
            </div>
        </div>
    );
}
