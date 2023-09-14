import styles from './editor-canvas.module.css';
import {CanvasChunk} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {paletteProvider, ZxColorTypes} from '@/app/services/palette-provider';

export default function EditorCanvas() {
    const {symbol, ink, paper, fieldsMap, setFieldsMap, bright} = useContext(editorContext);
    const canvases: React.ReactNode[] = [];

    const changeField = (fieldNumber: number) => {
        if (fieldsMap[fieldNumber]){
            fieldsMap[fieldNumber] = {
                ...fieldsMap[fieldNumber],
                ink,
                paper,
                symbol,
                bright,
            };
            setFieldsMap([...fieldsMap]);
        }
    };
    let fieldNumber = 0;
    fieldsMap.forEach(
        field => canvases.push(
            <CanvasChunk key={field.x + '-' + field.y}
                         inkColor={paletteProvider.getColor(field.ink, field.bright? ZxColorTypes.BRIGHT : ZxColorTypes.DARK)}
                         paperColor={paletteProvider.getColor(field.paper, field.bright? ZxColorTypes.BRIGHT : ZxColorTypes.DARK)}
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