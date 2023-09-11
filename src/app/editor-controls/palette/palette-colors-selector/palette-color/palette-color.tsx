import styles from './palette-color.module.css';
import {Color} from '@/app/services/color';

export const PaletteColor = ({name, color}: { name: string, color: Color }) => {
    const colorString = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';
    return <div title={name} className={styles['palette-color']} style={{backgroundColor: colorString}}></div>;
};