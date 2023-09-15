'use client';

import styles from './page.module.css';
import EditorCanvas from '@/app/editor-canvas/editor-canvas';
import EditorControls from '@/app/editor-controls/editor-controls';
import {Metadata} from 'next';
import {editorContext} from '@/app/models/editor-context';
import {useState} from 'react';
import {CanvasField} from '@/app/models/canvas-field';
import {ZxColorNames} from '@/app/models/zx-color-names';

export default function Home() {
    const [symbol, setSymbol] = useState(32);
    const [grid, setGrid] = useState(true);
    const [ink, setInk] = useState(ZxColorNames.BLACK);
    const [paper, setPaper] = useState(ZxColorNames.WHITE);
    const [bright, setBright] = useState(true);
    const [flash, setFlash] = useState(false);
    const [fieldsMap, setFieldsMap] = useState(Array(768).fill(null).map((_, index) => ({
        grid: true,
        ink: ZxColorNames.BLACK,
        paper: ZxColorNames.WHITE,
        symbol: 0,
        bright: true,
        flash: false,
        x: index % 32,
        y: Math.floor(index / 32),
    } as CanvasField)));
    return (
        <main className={styles.editor}>
            <editorContext.Provider value={{symbol, setSymbol, ink, setInk, paper, setPaper, fieldsMap, setFieldsMap, bright, setBright, flash, setFlash, grid, setGrid}}>
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