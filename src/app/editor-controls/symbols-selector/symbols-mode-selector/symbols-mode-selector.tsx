import styles from './symbols-mode-selector.module.css';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';

export const SymbolsModeSelector = () => {
    const {symbolsMode, setSymbolsMode} = useContext(editorContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.value) {
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

    return <div className={styles.selector}>
        <label>
            <input
                type="radio"
                value="symbols"
                checked={symbolsMode === 'symbols'}
                onChange={handleChange}
            />
            Symbols
        </label>
        <label>
            <input
                type="radio"
                value="blocks"
                checked={symbolsMode === 'blocks'}
                onChange={handleChange}
            />
            Blocks
        </label>
        <label>
            <input
                type="radio"
                value="ignore"
                checked={symbolsMode === 'ignore'}
                onChange={handleChange}
            />
            Ignore
        </label>
    </div>;
};