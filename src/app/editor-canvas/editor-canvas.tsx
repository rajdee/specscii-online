import styles from './editor-canvas.module.css';
import {CanvasChunk} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';

export default function EditorCanvas() {
    const {symbol, ink, paper, fieldsMap, setFieldsMap, bright, flash} = useContext(editorContext);
    const canvases: React.ReactNode[] = [];

    const changeField = (fieldNumber: number) => {
        if (fieldsMap[fieldNumber]) {
            const newInk = ink ? ink : fieldsMap[fieldNumber].ink;
            const newPaper = paper ? paper : fieldsMap[fieldNumber].paper;
            const newSymbol = symbol ? symbol : fieldsMap[fieldNumber].symbol;
            const newBright = bright !== null ? bright : fieldsMap[fieldNumber].bright;
            const newFlash = flash !== null ? flash : fieldsMap[fieldNumber].flash;
            console.log(newBright, bright);
            fieldsMap[fieldNumber] = {
                ...fieldsMap[fieldNumber],
                ink: newInk,
                paper: newPaper,
                symbol: newSymbol,
                bright: newBright,
            };
            setFieldsMap([...fieldsMap]);
        }
    };
    let fieldNumber = 0;
    fieldsMap.forEach(
        field => canvases.push(
            <CanvasChunk key={field.x + '-' + field.y}
                         ink={field.ink}
                         paper={field.paper}
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