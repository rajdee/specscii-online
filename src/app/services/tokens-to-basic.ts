const part1 = [
    0,
    10,
    9,
    0,
    231,
    49,
    14,
    0,
    0,
    0,
    0,
    0,
    13,
    0,
    20,
];
const part2 = [
    245,
    34,
];
const part3 = [
    34,
    13,
    128,
    170,
    0,
    0,
];
const quotes = 34;

class TokensToBasic {
    public convertToBasic(tokens: Array<number>) {
        const updatedTokens = tokens.flatMap(token => {
            if (token === quotes) {
                return [quotes, quotes];
            }
            return token;
        });

        const len1 = (length & 0xFF00) >> 8; // старший байт
        const len2 = length & 0x00FF; // младший байт

        return [...part1, len2, len1, ...part2, ...updatedTokens, ...part3];
    }
}


export const tokensToBasic = new TokensToBasic();