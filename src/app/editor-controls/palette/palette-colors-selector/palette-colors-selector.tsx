import {PaletteColor} from './palette-color/palette-color';
import styles from './palette-colors-selector.module.css';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {ZxColors} from '@/app/models/zx-colors';

type PaletteColorsSelectorProps = {
    colors: ZxColors,
    currentColor: ZxColorNames,
    changeColor: (arg0: ZxColorNames) => void
}

export default function PaletteColorsSelector({colors, currentColor, changeColor}: PaletteColorsSelectorProps) {
    const selectors = [] as React.ReactNode[];
    if (colors) {
        for (const name of Object.keys(colors) as ZxColorNames[]) {
            selectors.push(<PaletteColor selected={name === currentColor} changeColor={changeColor}
                                         key={name + colors[name]} name={name} color={colors[name]}></PaletteColor>);
        }
    }
    return <div className={styles['palette-colors-selector']}>{selectors}</div>;
}