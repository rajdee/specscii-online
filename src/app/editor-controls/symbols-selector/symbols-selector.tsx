import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {symbolsProvider} from '@/app/services/symbols-provider';
import {SymbolSelector} from '@/app/editor-controls/symbols-selector/symbol-selector/symbol-selector';
import styles from './symbols-selector.module.css';
import {SymbolsModeSelector} from '@/app/editor-controls/symbols-selector/symbols-mode-selector/symbols-mode-selector';

export default function SymbolsSelector() {
    const {symbol, setSymbol, setSymbolsMode} = useContext(editorContext);
    const selectors = [] as React.ReactNode[];
    const symbols = symbolsProvider.getFont();
    const changeSymbol = (symbolNumber: number) => {
        setSymbol(symbolNumber);
        setSymbolsMode('symbols')
    };
    if (symbols) {
        for (const number of Object.keys(symbols)) {
            selectors.push(<SymbolSelector selected={+number === symbol} key={+number} symbolNumber={+number}
                                           changeSymbol={changeSymbol}></SymbolSelector>);
        }
    }
    return <div className={styles['symbols-selector']}>
        <SymbolsModeSelector/>
        <div className={styles['symbols-selector-grid']}>{selectors}</div>
    </div>;
}