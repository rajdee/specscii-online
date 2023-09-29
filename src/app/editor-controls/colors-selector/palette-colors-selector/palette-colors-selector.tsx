import {PaletteColor} from './palette-color/palette-color';
import styles from './palette-colors-selector.module.css';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {ZxColors} from '@/app/models/zx-colors';
import {ReactNode} from 'react';

type PaletteColorsSelectorProps = {
    colors: ZxColors,
    children: ReactNode,
    currentColor: ZxColorNames | null,
    changeColor: (arg0: ZxColorNames | null) => void
}

export default function PaletteColorsSelector({colors, children, currentColor, changeColor}: PaletteColorsSelectorProps) {
    const selectors = [] as React.ReactNode[];
    if (colors) {
        for (const name of Object.keys(colors) as ZxColorNames[]) {
            selectors.push(<PaletteColor selected={name === currentColor} changeColor={changeColor}
                                         key={name + colors[name]} name={name} color={colors[name]}></PaletteColor>);
        }
        selectors.push(<PaletteColor selected={null === currentColor} changeColor={changeColor}
                                     key={'transparent'} name={null} color={colors[ZxColorNames.WHITE]}></PaletteColor>);
    }
    return <div className={styles['palette-colors-selector']}>
        {children}
        {selectors}
    </div>;
}