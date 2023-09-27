import styles from './file-controls.module.css';
import {imageDataTransformer} from '@/app/services/image-data-transformer';
import {useContext, useState} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {tokensToBasic} from '@/app/services/tokens-to-basic';
import {jsonExporter} from '@/app/services/json-export';
import {LoadFile} from '@/app/editor-controls/file-controls/load-file/load-file';
import {cleanFieldsMapProvider} from '@/app/services/CleanFieldsMapProvider';
import {Button, Dialog, DialogContent, Stack, TextField} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export const FileControls = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <Button variant="contained" onClick={handleOpen}>Files</Button>

        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Stack spacing={4} direction="row">
                    <Stack spacing={2}>
                        <h3>New image</h3>
                        <TextField label="Author name" variant="outlined" size={'small'}/>
                        <TextField label="Image title" variant="outlined" size={'small'}/>
                        <Button variant="contained" onClick={clear}>New image</Button>
                    </Stack>
                    <Stack spacing={2}>
                        <h3>Load</h3>
                        <LoadFile/>
                    </Stack>
                    <Stack spacing={2}>
                        <h3>Save as</h3>
                        <Button style={{justifyContent: "flex-start"}} startIcon={<CloudDownloadIcon/>} variant="contained" onClick={saveJson}>JSON</Button>
                        <Button style={{justifyContent: "flex-start"}} startIcon={<CloudDownloadIcon/>} variant="outlined" onClick={saveTokens}>tokens</Button>
                        <Button style={{justifyContent: "flex-start"}} startIcon={<CloudDownloadIcon/>} variant="outlined" onClick={saveBasic}>Basic</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    </div>;
};