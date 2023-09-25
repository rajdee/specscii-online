'use client';

import styles from './editor.module.css';
import EditorCanvas from '@/app/editor-canvas/editor-canvas';
import EditorControls from '@/app/editor-controls/editor-controls';
import {editorContext} from '@/app/models/editor-context';
import {UndoHistory, undoHistoryContext} from '@/app/models/undo-context';
import {useEffect, useState} from 'react';
import {CanvasField} from '@/app/models/canvas-field';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {SymbolsMode} from '@/app/models/symbols-mode';
import {cleanFieldsMapProvider} from '@/app/services/CleanFieldsMapProvider';

export default function Editor() {
    const [undoHistory, setUndoHistory] = useState<UndoHistory>([] as UndoHistory);
    const [undoStepNumber, setUndoStepNumber] = useState<number>(0);
    const [symbolsMode, setSymbolsMode] = useState<SymbolsMode>('symbols');
    const [symbol, setSymbol] = useState<number>(32);
    const [grid, setGrid] = useState<boolean>(true);
    const [ink, setInk] = useState<ZxColorNames | null>(ZxColorNames.BLACK);
    const [paper, setPaper] = useState<ZxColorNames | null>(ZxColorNames.WHITE);
    const [bright, setBright] = useState<boolean | null>(true);
    const [flash, setFlash] = useState<boolean | null>(false);
    const [fieldsMap, setFieldsMap] = useState(cleanFieldsMapProvider.get());

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const fieldsMap = localStorage.getItem('fieldsMap');
            if (fieldsMap) {
                setFieldsMap(JSON.parse(fieldsMap) as CanvasField[]);
            }
        }
    }, []);

    return (
        <main className={styles.editor}>
            <undoHistoryContext.Provider value={{undoHistory, setUndoHistory, undoStepNumber, setUndoStepNumber}}>
                <editorContext.Provider value={{
                    symbolsMode, setSymbolsMode,
                    symbol, setSymbol,
                    ink, setInk,
                    paper, setPaper,
                    fieldsMap, setFieldsMap,
                    bright, setBright,
                    flash, setFlash,
                    grid, setGrid,
                }}>
                    <EditorCanvas/>
                    <EditorControls/>
                </editorContext.Provider>
            </undoHistoryContext.Provider>
        </main>
    );
}