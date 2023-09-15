
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
    1,
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

class TokensToBasic {
    public convertToBasic(tokens: Array<number>) {
        return [...before, ...tokens, ...after];
    }
}


export const tokensToBasic = new TokensToBasic();