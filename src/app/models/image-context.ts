import {createContext} from 'react';

export type ImageContextValue = {
    author: string,
    setAuthor: (author: string) => void,
    imageName: string,
    setImageName: (imageName: string) => void,
}
const defaultValue: ImageContextValue = {
    author: '',
    setAuthor: (author: string) => {
    },
    imageName: '',
    setImageName: (imageName: string) => {
    },
};
export const imageContext = createContext<ImageContextValue>(defaultValue);
