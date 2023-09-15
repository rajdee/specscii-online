import {paletteProvider} from '../../services/palette-provider';
import PaletteColorsSelector from './palette-colors-selector/palette-colors-selector';
import styles from './palette.module.css';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {ZxPalette} from '@/app/models/zx-palette';

export default function Palette() {
    const palette: ZxPalette = paletteProvider.getPalette();
    const {ink, paper, setInk, setPaper, bright} = useContext(editorContext);
    const colors = bright? palette.bright : palette.dark;
    return <div className={styles.palette}>
        <PaletteColorsSelector colors={colors} currentColor={ink} changeColor={setInk}></PaletteColorsSelector>
        <PaletteColorsSelector colors={colors} currentColor={paper}
                               changeColor={setPaper}></PaletteColorsSelector>
    </div>;
}