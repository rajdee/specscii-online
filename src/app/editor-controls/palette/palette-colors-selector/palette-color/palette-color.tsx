import styles from './palette-color.module.css';
import {Color} from '@/app/models/color';
import {ZxColorNames} from '@/app/models/zx-color-names';

type PaletteColorProps = {
    name: ZxColorNames,
    selected: boolean,
    changeColor: (arg0: ZxColorNames) => void;
    color: Color
}
export const PaletteColor = ({name, selected, changeColor, color}: PaletteColorProps) => {
    const handleClick = () => {
        changeColor(name);
    };
    const colorString = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + Math.floor(color.a / 255)  + ')';
    const className = selected ? `${styles['palette-color']} ${styles['palette-color-selected']}` : styles['palette-color'];
    return <div title={name} className={className} style={{backgroundColor: colorString}} onClick={handleClick}></div>;
};