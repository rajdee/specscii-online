'use client';

// import Image from 'next/image'
import styles from './page.module.css';
import EditorCanvas from '@/app/editor-canvas/editor-canvas';
import EditorControls from '@/app/editor-controls/editor-controls';
import {Metadata} from 'next';

export default function Home() {
    return (
        <main className={styles.editor}>
            <EditorCanvas />
            <EditorControls />
        </main>
    );
}
export const metadata: Metadata = {
    title: 'Specscii editor',
    description: 'Specscii editor',
};