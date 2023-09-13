'use client';

// import Image from 'next/image'
import styles from './page.module.css';
import EditorCanvas from '@/app/editor-canvas/editor-canvas';
import EditorControls from '@/app/editor-controls/editor-controls';
import {Metadata} from 'next';
import {editorContext} from '@/app/models/editor-context';
import {useState} from 'react';
import {ZxColorNames} from '@/app/services/palette-provider';

export default function Home() {
    const [symbol, setSymbol] = useState(32);
    const [ink, setInk] = useState(ZxColorNames.BLACK);
    const [paper, setPaper] = useState(ZxColorNames.WHITE);
    const [bright, setBright] = useState(true);
    const [flash, setFlash] = useState(false);
    const [fieldsMap, setFieldsMap] = useState(Array(768).fill(null).map((_, index) => ({
        ink: ZxColorNames.BLACK,
        paper: ZxColorNames.WHITE,
        symbol: 0,
        bright: false,
        flash: false,
        x: index % 32,
        y: Math.floor(index / 32),
    })));
    return (
        <main className={styles.editor}>
            <editorContext.Provider value={{symbol, setSymbol, ink, setInk, paper, setPaper, fieldsMap, setFieldsMap, bright, setBright, flash, setFlash}}>
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