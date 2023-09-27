import {ReactNode} from 'react';
import styles from './nullable-boolean-selector.module.css';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';

interface NullableBooleanSelectorProps {
    setting: boolean | null,
    changeSetting: (setting: boolean | null) => void,
    optionIcon: ReactNode,
    children: ReactNode
}

export const NullableBooleanSelector = ({setting, changeSetting, optionIcon, children}: NullableBooleanSelectorProps) => {
    let selected: 'on' | 'off' | 'ignore' = 'on';
    switch (setting) {
        case true:
        default:
            selected = 'on';
            break;
        case false:
            selected = 'off';
            break;
        case null:
            selected = 'ignore';
            break;
    }

    const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
        switch (value) {
            case 'on':
                changeSetting(true);
                break;
            case 'off':
                changeSetting(false);
                break;
            case 'ignore':
                changeSetting(null);
                break;
            default:
                break;
        }
    };

    return <ToggleButtonGroup
        className={styles.group}
        color="primary"
        value={selected}
        exclusive
        onChange={handleChange}
        aria-label="Mode"
        size={'small'}
    >
        <ToggleButton value="on">{optionIcon}{children} On</ToggleButton>
        <ToggleButton value="off">Off</ToggleButton>
        <ToggleButton value="ignore">Ignore</ToggleButton>
    </ToggleButtonGroup>;

};
