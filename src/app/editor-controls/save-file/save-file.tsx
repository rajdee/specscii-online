import styles from './save-file.module.css';
import {imageDataTransformer} from '@/app/services/image-data-transformer';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {tokensToBasic} from '@/app/services/tokens-to-basic';

export const SaveFile = () => {
    const {fieldsMap} = useContext(editorContext);
    const saveTokens = () => {
        const tokens = imageDataTransformer.convertToTokens(fieldsMap);
        downloadFile(tokens, 'tokens.C');
    };
    const saveBasic = () => {
        const tokens = imageDataTransformer.convertToTokens(fieldsMap);
        console.log(tokens);
        const basic = tokensToBasic.convertToBasic(tokens);
        console.log(basic);
        downloadFile(basic, 'image.B');
    };
    const downloadFile = (numbers: number[], filename: string) => {
        const bytes = new Uint8Array(numbers);
        let binaryString = '';
        bytes.forEach((byte) => {
            binaryString += String.fromCharCode(byte);
        });

        const base64Data = btoa(binaryString);

        const element = document.createElement('a');
        element.setAttribute('href', 'data:application/octet-stream;base64,' + base64Data);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };


    return <div><input className={styles['save-file']} type="button" onClick={saveTokens} value="Save tokens"/>
        <input className={styles['save-file']} type="button" onClick={saveBasic} value="Save basic"/>
    </div>;
};