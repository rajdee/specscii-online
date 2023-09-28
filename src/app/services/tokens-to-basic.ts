const before = [
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
    14,
    0,
    245,
    34,
];
const after = [
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
            if (token === 34) {
                return [34, 34];
            }
            return token;
        });
        return [...before, ...updatedTokens, ...after];
    }
}


export const tokensToBasic = new TokensToBasic();