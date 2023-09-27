import {useContext, useRef} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {jsonExporter} from '@/app/services/json-export';
import {Button, styled} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const LoadFile = () => {
    const {setFieldsMap} = useContext(editorContext);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const buttonClick = () => {
        const fileInput = fileInputRef.current as HTMLInputElement;
        if (fileInput) {
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                () => {
                    if (reader.result) {
                        const data = jsonExporter.getDataFromJson(String(reader.result));
                        setFieldsMap(data.fields);
                    }
                },
                false,
            );
            if (fileInput.files && fileInput.files.length > 0) {
                reader.readAsText(fileInput.files[0]);
            }
        }
    };


    return     <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={buttonClick}>
        JSON
        <VisuallyHiddenInput type="file" ref={fileInputRef} />
    </Button>
};