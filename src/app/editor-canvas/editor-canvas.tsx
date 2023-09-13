import styles from './editor-canvas.module.css';
import {CanvasChunk} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {paletteProvider, ZxColorTypes} from '@/app/services/palette-provider';

export default function EditorCanvas() {
    const {symbol, ink, paper, fieldsMap, setFieldsMap} = useContext(editorContext);
    const canvases = [];

    const changeField = (fieldNumber: number) => {
        fieldsMap[fieldNumber] = {
            ...fieldsMap[fieldNumber],
            ink,
            paper,
            symbol,
        };
        setFieldsMap([...fieldsMap]);
    };
    let fieldNumber = 0;
    fieldsMap.forEach(
        field => canvases.push(
            <CanvasChunk key={field.x + '-' + field.y}
                         inkColor={paletteProvider.getColor(field.ink, ZxColorTypes.BRIGHT)}
                         paperColor={paletteProvider.getColor(field.paper, ZxColorTypes.BRIGHT)}
                         bright={field.bright}
                         flash={field.flash}
                         fieldNumber={fieldNumber++}
                         changeField={changeField}
                         symbolNumber={field.symbol}
            />,
        ),
    );

    return (
        <div className={styles['editor-canvas']}>{canvases}</div>
    );
}