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
import {cleanFieldsMapProvider} from '@/app/services/clean-fields-map-provider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {localStorageService} from '@/app/services/local-storage-service';
import {imageContext} from '@/app/models/image-context';
import {undoHistoryService} from '@/app/services/undo-history-service';
import useEventListener from '@use-it/event-listener';

export default function Editor() {
    const [author, setAuthor] = useState<string>('');
    const [imageName, setImageName] = useState<string>('');
    const [undoHistory, setUndoHistory] = useState<UndoHistory>([] as UndoHistory);
    const [undoStepNumber, setUndoStepNumber] = useState<number>(0);
    const [symbolsMode, setSymbolsMode] = useState<SymbolsMode>('symbols');
    const [symbol, setSymbol] = useState<number>(32);
    const [grid, setGrid] = useState<boolean | null>(false);
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
                    background: {
                        default: '#F2F6FB',
                    },
                },
            }),
        [prefersDarkMode],
    );

    useEffect(() => {

        const fieldsMap = localStorageService.getItem('fieldsMap');
        if (fieldsMap) {
            setFieldsMap(fieldsMap as CanvasField[]);
        }
        const author = localStorageService.getItem('author');
        if (author) {
            setAuthor(author);
        }
        const imageName = localStorageService.getItem('imageName');
        if (imageName) {
            setImageName(imageName);
        }
    }, []);

    const keyHandler = (event: KeyboardEvent) => {
        if (event.key === 'z' && event.ctrlKey){
            undoHistoryService.undo(fieldsMap, setFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory);
        }
        else if (event.key === 'y' && event.ctrlKey){
            undoHistoryService.redo(fieldsMap, setFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory);
        }
    };

    useEventListener('keydown', keyHandler);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <main className={styles.editor}>
                <imageContext.Provider value={{author, setAuthor, imageName, setImageName}}>
                    <undoHistoryContext.Provider
                        value={{undoHistory, setUndoHistory, undoStepNumber, setUndoStepNumber}}>
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
                </imageContext.Provider>
            </main>
        </ThemeProvider>
    );
}