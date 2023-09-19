'use client';

import styles from './page.module.css';
import EditorCanvas from '@/app/editor-canvas/editor-canvas';
import EditorControls from '@/app/editor-controls/editor-controls';
import {Metadata} from 'next';
import {editorContext} from '@/app/models/editor-context';
import {useEffect, useState} from 'react';
import {CanvasField} from '@/app/models/canvas-field';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {SymbolsMode} from '@/app/models/symbols-mode';

export default function Home() {

    const [symbolsMode, setSymbolsMode] = useState<SymbolsMode>('symbols');
    const [symbol, setSymbol] = useState<number>(32);
    const [grid, setGrid] = useState<boolean>(true);
    const [ink, setInk] = useState<ZxColorNames | null>(ZxColorNames.BLACK);
    const [paper, setPaper] = useState<ZxColorNames | null>(ZxColorNames.WHITE);
    const [bright, setBright] = useState<boolean | null>(true);
    const [flash, setFlash] = useState<boolean | null>(false);
    const [fieldsMap, setFieldsMap] = useState(Array(768).fill(null).map((_, index) => ({
        ink: ZxColorNames.BLACK,
        paper: ZxColorNames.WHITE,
        symbol: 0,
        bright: true,
        flash: false,
        x: index % 32,
        y: Math.floor(index / 32),
    } as CanvasField)));

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const fieldsMap = localStorage.getItem('fieldsMap');
            if (fieldsMap) {
                setFieldsMap(JSON.parse(fieldsMap) as CanvasField[]);
            }
        }
    }, []);
    // useEffect(() => {
    //         const interval = setInterval(
    //             () => {
    //
    //
    //             }, 320,
    //         );
    //         return () => {
    //             clearInterval(interval);
    //         };
    //     },
    // );

    return (
        <main className={styles.editor}>
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
        </main>
    );
}
export const metadata: Metadata = {
    title: 'Specscii editor',
    description: 'Specscii editor',
};