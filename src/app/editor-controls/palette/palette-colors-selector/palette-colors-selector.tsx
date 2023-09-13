import {ZxColorNames, ZxColors} from '@/app/services/palette-provider';
import {PaletteColor} from './palette-color/palette-color';
import styles from './palette-colors-selector.module.css';

type PaletteColorsSelectorProps = {
    colors: ZxColors,
    currentColor: ZxColorNames,
    changeColor: (ZxColorNames) => void
}

export default function PaletteColorsSelector({colors, currentColor, changeColor}: PaletteColorsSelectorProps) {
    const selectors = [] as PaletteColor[];
    if (colors) {
        for (const name of Object.keys(colors)) {
            selectors.push(<PaletteColor selected={name === currentColor} changeColor={changeColor}
                                         key={name + colors[name]} name={name} color={colors[name]}></PaletteColor>);
        }
    }
    return <div className={styles['palette-colors-selector']}>{selectors}</div>;
}