import {ZxColors} from '@/app/services/palette-provider';
import {PaletteColor} from './palette-color/palette-color';

export default function PaletteColorsSelector({colors}: { colors: ZxColors }) {
    const selectors = [] as PaletteColor[];
    if (colors) {
        for (const name of Object.keys(colors)) {
            selectors.push(<PaletteColor key={name+colors[name]} name={name} color={colors[name]}></PaletteColor>);
        }
    }
    return <div>{selectors}</div>;
}