import {paletteProvider} from '../../services/palette-provider';
import PaletteColorsSelector from './palette-colors-selector/palette-colors-selector';
import styles from './colors-selector.module.css';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {ZxPalette} from '@/app/models/zx-palette';

export default function ColorsSelector() {
    const palette: ZxPalette = paletteProvider.getPalette();
    const {ink, paper, setInk, setPaper, bright} = useContext(editorContext);
    const colors = bright ? palette.bright : palette.dark;
    const swap = () => {
        const swapper = ink;
        setInk(paper);
        setPaper(swapper);
    };
    return <div className={styles['colors-selector']}>
        <div className={styles.palettes}>
            <PaletteColorsSelector colors={colors} currentColor={ink} changeColor={setInk}></PaletteColorsSelector>
            <PaletteColorsSelector colors={colors} currentColor={paper}
                                   changeColor={setPaper}></PaletteColorsSelector>
        </div>
        <button onClick={swap}>Swap</button>
    </div>;
}