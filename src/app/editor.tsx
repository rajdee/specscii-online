'use client';

import styles from './editor.module.css';
import EditorCanvas from '@/app/editor-canvas/editor-canvas';
import EditorControls from '@/app/editor-controls/editor-controls';
import {editorContext} from '@/app/models/editor-context';
import {UndoHistory, undoHistoryContext} from '@/app/models/undo-context';
import {useEffect, useMemo, useState} from 'react';
import {CanvasField} from '@/app/models/canvas-field';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {SymbolsMode} from '@/app/models/symbols-mode';
import {cleanFieldsMapProvider} from '@/app/services/CleanFieldsMapProvider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useMediaQuery} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const fieldsMap = localStorage.getItem('fieldsMap');
            if (fieldsMap) {
                setFieldsMap(JSON.parse(fieldsMap) as CanvasField[]);
            }
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
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
        </ThemeProvider>

    );
}