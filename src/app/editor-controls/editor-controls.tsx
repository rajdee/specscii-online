import styles from './editor-controls.module.css';
import Palette from './palette/palette.tsx';
import SymbolsSelector from './symbols/symbols-selector.tsx';

export default function EditorControls() {

    return (
        <div className={styles.controls}>
            <div className={styles.top}>
                <Palette></Palette>
                <div>B</div>
                <div>F</div>
            </div>
            <SymbolsSelector></SymbolsSelector>
        </div>
    );
}