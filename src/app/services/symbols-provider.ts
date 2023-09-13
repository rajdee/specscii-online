import {FontData} from '../models/font-data';

type Row = {
    [key in 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]: boolean;
};
type FontSymbol = {
    [key in 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7]: Row;
};


class SymbolsProvider {
    private font: Array<FontSymbol> = [];

    constructor() {
        this.parse();
    }

    private parse(): void {
        for (let i = 0; i < FontData.length / 8; i++) {
            const symbol: Partial<FontSymbol> = {};
            for (let j = 0; j < 8; j++) {
                const binaryString = FontData[i * 8 + j].toString(2).padStart(8, '0');
                const row: Partial<Row> = {};

                for (let x = 0; x < 8; x++) {
                    row[x] = binaryString[x] === '1';
                }
                symbol[j] = row;
            }
            this.font.push(symbol);
        }
    }

    public getSymbol(symbolNumber: number): FontSymbol | null {
        return this.font[symbolNumber] ?? null;
    }

    public getFont(): Array<FontSymbol> {
        return this.font;
    }
}

export const symbolsProvider = new SymbolsProvider();