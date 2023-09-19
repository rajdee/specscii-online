import {createContext} from 'react';

export type FlashSwapContextValue = {
    flashSwap: boolean,
}
const defaultValue: FlashSwapContextValue = {
    flashSwap: false,
};
export const flashSwapContext = createContext<FlashSwapContextValue>(defaultValue);
