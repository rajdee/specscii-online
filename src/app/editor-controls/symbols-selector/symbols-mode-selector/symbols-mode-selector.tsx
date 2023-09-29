import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const SymbolsModeSelector = () => {
    const {symbolsMode, setSymbolsMode} = useContext(editorContext);
    const handleChange = (event: React.MouseEvent<HTMLElement>, newMode: string) => {
        switch (newMode) {
            case 'symbols':
                setSymbolsMode('symbols');
                break;
            case 'blocks':
                setSymbolsMode('blocks');
                break;
            case 'ignore':
            default:
                setSymbolsMode('ignore');
                break;
        }
    };

    return <ToggleButtonGroup
        color="primary"
        value={symbolsMode}
        exclusive
        onChange={handleChange}
        aria-label="Mode"
        size={'small'}
    >
        <ToggleButton value="symbols">Symbols</ToggleButton>
        <ToggleButton value="blocks">Blocks</ToggleButton>
        <ToggleButton value="ignore">Ignore</ToggleButton>
    </ToggleButtonGroup>;
};