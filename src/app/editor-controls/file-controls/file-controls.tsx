import styles from './file-controls.module.css';
import {imageDataTransformer} from '@/app/services/image-data-transformer';
import {useContext, useRef} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {tokensToBasic} from '@/app/services/tokens-to-basic';
import {jsonExporter} from '@/app/services/json-export';
import {LoadFile} from '@/app/editor-controls/file-controls/load-file/load-file';
import {cleanFieldsMapProvider} from '@/app/services/CleanFieldsMapProvider';

export const FileControls = () => {
    const {fieldsMap, setFieldsMap} = useContext(editorContext);
    const saveTokens = () => {
        const tokens = imageDataTransformer.convertToTokens(fieldsMap);
        downloadBinary(tokens, 'image.C');
    };
    const clear = () => {
        setFieldsMap(cleanFieldsMapProvider.get());
    };
    const saveJson = () => {
        const json = jsonExporter.getJsonFromData(fieldsMap, 0);
        downloadFile(JSON.stringify(json), 'image.json');
    };
    const saveBasic = () => {
        const tokens = imageDataTransformer.convertToTokens(fieldsMap);
        const basic = tokensToBasic.convertToBasic(tokens);
        downloadBinary(basic, 'image.B');
    };
    const downloadBinary = (numbers: number[], filename: string) => {
        const bytes = new Uint8Array(numbers);
        let binaryString = '';
        bytes.forEach((byte) => {
            binaryString += String.fromCharCode(byte);
        });
        downloadFile(binaryString, filename);
    };
    const downloadFile = (binaryString: string, filename: string) => {
        const base64Data = btoa(binaryString);

        const element = document.createElement('a');
        element.setAttribute('href', 'data:application/octet-stream;base64,' + base64Data);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    return <div className={styles['file-controls']}>
        <div>
            <input className={styles['clear-button']} type="button" onClick={clear} value="Clear"/>
        </div>
        <div>
            <input className={styles['save-file-button']} type="button" onClick={saveJson} value="Save json"/>
            <input className={styles['save-file-button']} type="button" onClick={saveTokens} value="Save tokens"/>
            <input className={styles['save-file-button']} type="button" onClick={saveBasic} value="Save basic"/>
        </div>
        <LoadFile/>
    </div>;
};