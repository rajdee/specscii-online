import styles from './editor-controls.module.css';
import Palette from './palette/palette';
import SymbolsSelector from './symbols-selector/symbols-selector';
import {NullableBooleanSelector} from '@/app/editor-controls/nullable-boolean-selector/nullable-boolean-selector';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {FileControls} from '@/app/editor-controls/file-controls/file-controls';
import {CheckboxSelector} from '@/app/editor-controls/checkbox-selector/checkbox-selector';

export default function EditorControls() {
    const {bright, setBright, flash, setFlash, grid, setGrid} = useContext(editorContext);

    return (
        <div className={styles.controls}>
            <div className={styles.top}>
                <Palette></Palette>
                <NullableBooleanSelector setting={bright} changeSetting={setBright}>Bright</NullableBooleanSelector>
                <NullableBooleanSelector setting={flash} changeSetting={setFlash}>Flash</NullableBooleanSelector>
                <CheckboxSelector setting={grid} changeSetting={setGrid}>Grid</CheckboxSelector>
                <FileControls></FileControls>
            </div>
            <SymbolsSelector></SymbolsSelector>
        </div>
    );
}