import styles from './editor-canvas.module.css';
import {CanvasChunk} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';

export default function EditorCanvas() {
    const canvases = [];
    for (let i = 0; i < 768; i++) {
        canvases.push(<CanvasChunk key={i} inkColor={{r: 205, g: 0, b: 0, a: 255}} paperColor={{r: 205, g: 205, b: 205, a: 255}} bright={false} flash={false} number={32}/>);
    }
    return (
        <div className={styles['editor-canvas']}>{canvases}</div>
    );
}