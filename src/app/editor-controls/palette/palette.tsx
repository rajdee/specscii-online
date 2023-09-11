import {PaletteProvider, ZxPalette} from '../../services/palette-provider';
import PaletteColorsSelector from './palette-colors-selector/palette-colors-selector';
import styles from './palette.module.css';

export default function Palette() {
    const palette: ZxPalette = PaletteProvider.getPalette();
    return <div className={styles.palette}>
        <PaletteColorsSelector colors={palette.bright}></PaletteColorsSelector>
        <PaletteColorsSelector colors={palette.dark}></PaletteColorsSelector>
    </div>;
}