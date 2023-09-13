import {paletteProvider, ZxPalette} from '../../services/palette-provider';
import PaletteColorsSelector from './palette-colors-selector/palette-colors-selector';
import styles from './palette.module.css';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';

export default function Palette() {
    const palette: ZxPalette = paletteProvider.getPalette();
    const {ink, paper, setInk, setPaper} = useContext(editorContext);
    return <div className={styles.palette}>
        <PaletteColorsSelector colors={palette.bright} currentColor={ink} changeColor={setInk}></PaletteColorsSelector>
        <PaletteColorsSelector colors={palette.bright} currentColor={paper}
                               changeColor={setPaper}></PaletteColorsSelector>
    </div>;
}