import styles from './editor-canvas.module.css';
import {CanvasChunk} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';
import {useContext, useEffect, useState} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {flashSwapContext} from '@/app/models/flash-swap-context';

export default function EditorCanvas() {
    const {symbolsMode, symbol, ink, paper, fieldsMap, setFieldsMap, bright, flash} = useContext(editorContext);
    const canvases: React.ReactNode[] = [];
    const [flashSwap, setFlashSwap] = useState<boolean>(false);
    const changeField = (fieldNumber: number) => {
        if (fieldsMap[fieldNumber]) {
            const newInk = ink ? ink : fieldsMap[fieldNumber].ink;
            const newPaper = paper ? paper : fieldsMap[fieldNumber].paper;
            const newSymbol = symbolsMode !== 'ignore' ? symbol : fieldsMap[fieldNumber].symbol;
            const newBright = bright !== null ? bright : fieldsMap[fieldNumber].bright;
            const newFlash = flash !== null ? flash : fieldsMap[fieldNumber].flash;

            fieldsMap[fieldNumber] = {
                ...fieldsMap[fieldNumber],
                ink: newInk,
                paper: newPaper,
                symbol: newSymbol,
                bright: newBright,
                flash: newFlash,
            };
            setFieldsMap([...fieldsMap]);
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('fieldsMap', JSON.stringify(fieldsMap));
            }
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