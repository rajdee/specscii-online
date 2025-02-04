import styles from './file-controls.module.css';
import {imageDataTransformer} from '@/app/services/image-data-transformer';
import {useContext, useState} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {tokensToBasic} from '@/app/services/tokens-to-basic';
import {jsonExporter} from '@/app/services/json-export';
import {LoadFile} from '@/app/editor-controls/file-controls/load-file/load-file';
import {cleanFieldsMapProvider} from '@/app/services/clean-fields-map-provider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SaveIcon from '@mui/icons-material/Save';
import {undoHistoryService} from '@/app/services/undo-history-service';
import {undoHistoryContext} from '@/app/models/undo-context';
import {localStorageService} from '@/app/services/local-storage-service';
import {imageContext} from '@/app/models/image-context';
import sanitize from 'sanitize-filename';

export const FileControls = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {author, setAuthor, imageName, setImageName} = useContext(imageContext);
    const {fieldsMap, setFieldsMap, ink, paper, bright, flash, symbol} = useContext(editorContext);
    const {undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory} = useContext(undoHistoryContext);

    const generateFileName = (extension: string) => {
        let name = author ? author + ' - ' : '';
        name = imageName ? name + imageName : name;

        return sanitize(`${name}.${extension}`);
    };

    const saveTokens = () => {
        const tokens = imageDataTransformer.convertToTokens(fieldsMap);
        downloadBinary(tokens, generateFileName('C'));
    };

    const clear = () => {
        undoHistoryService.writeHistoryStep(fieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory);

        const clearFieldsMap = cleanFieldsMapProvider.get(ink ?? undefined, paper ?? undefined, bright ?? undefined, flash ?? undefined, symbol ?? undefined);
        setFieldsMap(clearFieldsMap);
        localStorageService.setItem('fieldsMap', clearFieldsMap);
    };
    const saveJson = () => {
        const json = jsonExporter.getJsonFromData(fieldsMap, 0, author, imageName);
        downloadFile(JSON.stringify(json), generateFileName('specscii.json'));
    };
    const saveBasic = () => {
        const tokens = imageDataTransformer.convertToTokens(fieldsMap);
        const basic = tokensToBasic.convertToBasic(tokens);
        downloadBinary(basic, generateFileName('B'));
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
    const saveAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget) {
            setAuthor(event.currentTarget.value);
            localStorageService.setItem('author', event.currentTarget.value);
        }
    };
    const saveImageName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget) {
            setImageName(event.currentTarget.value);
            localStorageService.setItem('imageName', event.currentTarget.value);
        }
    };
    return <div className={styles['file-controls']}>
        <Button startIcon={<SaveIcon fontSize="small"/>} variant="contained" onClick={handleOpen}>Files</Button>

        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Stack spacing={4} direction="row">
                    <Stack spacing={2}>
                        <h3>New image</h3>
                        <TextField label="Author name" variant="outlined" size={'small'} onChange={saveAuthor}
                                   value={author}/>
                        <TextField label="Image title" variant="outlined" size={'small'} onChange={saveImageName}
                                   value={imageName}/>
                        <Button variant="contained" onClick={clear}>New image</Button>
                    </Stack>
                    <Stack spacing={2}>
                        <h3>Load</h3>
                        <LoadFile/>
                    </Stack>
                    <Stack spacing={2}>
                        <h3>Save as</h3>
                        <Button style={{justifyContent: 'flex-start'}} startIcon={<CloudDownloadIcon/>}
                                variant="contained" onClick={saveJson}>JSON</Button>
                        <Button style={{justifyContent: 'flex-start'}} startIcon={<CloudDownloadIcon/>}
                                variant="outlined" onClick={saveTokens}>tokens</Button>
                        <Button style={{justifyContent: 'flex-start'}} startIcon={<CloudDownloadIcon/>}
                                variant="outlined" onClick={saveBasic}>Basic</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    </div>;
};