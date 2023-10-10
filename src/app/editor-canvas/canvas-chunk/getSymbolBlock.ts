import { changeSymbolToBlock } from './changeSymbolToBlock';

export const getSymbolBlock = ({
    reset,
    symbol,
    canvasField,
    symbolsMode,
    canvasSymbol,
    quickCanvasPosition,
}) => {

    switch (symbolsMode) {
        case 'blocks':
            return changeSymbolToBlock(canvasSymbol, quickCanvasPosition, reset);
        case 'symbols':
            return symbol;
        default:
            return canvasField.symbol;
    }
};
