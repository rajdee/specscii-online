import styles from './editor-controls.module.css';
import Palette from './palette/palette';
import SymbolsSelector from './symbols-selector/symbols-selector';
import {CheckboxSelector} from '@/app/editor-controls/checkbox-selector/checkbox-selector';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {SaveFile} from '@/app/editor-controls/save-file/save-file';

export default function EditorControls() {
    const {bright, setBright, flash, setFlash, grid, setGrid} = useContext(editorContext);

    return (
        <div className={styles.controls}>
            <div className={styles.top}>
                <Palette></Palette>
                <CheckboxSelector setting={bright} changeSetting={setBright}>Bright</CheckboxSelector>
                <CheckboxSelector setting={flash} changeSetting={setFlash}>Flash</CheckboxSelector>
                <CheckboxSelector setting={grid} changeSetting={setGrid}>Grid</CheckboxSelector>
                <SaveFile></SaveFile>
            </div>
            <SymbolsSelector></SymbolsSelector>
        </div>
    );
}