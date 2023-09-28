import {paletteProvider} from '../../services/palette-provider';
import PaletteColorsSelector from './palette-colors-selector/palette-colors-selector';
import styles from './colors-selector.module.css';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {ZxPalette} from '@/app/models/zx-palette';
import {Button, Stack} from '@mui/material';

export default function ColorsSelector() {
    const palette: ZxPalette = paletteProvider.getPalette();
    const {ink, paper, setInk, setPaper, bright} = useContext(editorContext);
    const colors = bright ? palette.bright : palette.dark;
    const swap = () => {
        const swapper = ink;
        setInk(paper);
        setPaper(swapper);
    };
    return <Stack className={styles['colors-selector']} gap={2}>
        <Button variant="outlined" onClick={swap}>Swap</Button>
        <div className={styles.palettes}>
            <PaletteColorsSelector colors={colors} currentColor={ink} changeColor={setInk}></PaletteColorsSelector>
            <PaletteColorsSelector colors={colors} currentColor={paper}
                                   changeColor={setPaper}></PaletteColorsSelector>
        </div>
    </Stack>;
}