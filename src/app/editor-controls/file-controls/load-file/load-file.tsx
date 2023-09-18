import styles from '@/app/editor-controls/file-controls/file-controls.module.css';
import {useContext, useRef} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {jsonExporter} from '@/app/services/json-export';

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


    return <div>
        <input type="file" ref={fileInputRef}/>
        <input className={styles['load-file-button']} type="button" onClick={buttonClick} value="Load json"/>
    </div>;
};