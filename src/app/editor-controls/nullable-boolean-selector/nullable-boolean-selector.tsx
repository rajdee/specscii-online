import {ReactNode} from 'react';
import styles from './nullable-boolean-selector.module.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface NullableBooleanSelectorProps {
    setting: boolean | null,
    changeSetting: (setting: boolean | null) => void,
    optionIcon: ReactNode,
    children: ReactNode,
    labels?: Array<string>
}

export const NullableBooleanSelector = ({
                                            setting,
                                            changeSetting,
                                            optionIcon,
                                            children,
                                            labels,
                                        }: NullableBooleanSelectorProps) => {
    const internalLabels = labels ?? ['On', 'Off', 'Ignore'];

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
        fullWidth={true}
    >
        <ToggleButton value="on">{optionIcon}{children} {internalLabels[0]}</ToggleButton>
        <ToggleButton value="off">{internalLabels[1]}</ToggleButton>
        <ToggleButton value="ignore">{internalLabels[2]}</ToggleButton>
    </ToggleButtonGroup>;

};
