import styles from './editor-controls.module.css';
import ColorsSelector from './colors-selector/colors-selector';
import SymbolsSelector from './symbols-selector/symbols-selector';
import {NullableBooleanSelector} from '@/app/editor-controls/nullable-boolean-selector/nullable-boolean-selector';
import {useContext} from 'react';
import {editorContext} from '@/app/models/editor-context';
import {FileControls} from '@/app/editor-controls/file-controls/file-controls';
import {HistoryControls} from '@/app/editor-controls/history-controls/history-controls';
import Stack from '@mui/material/Stack';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LightModeIcon from '@mui/icons-material/LightMode';
import GridOnIcon from '@mui/icons-material/GridOn';

export default function EditorControls() {
    const {bright, setBright, flash, setFlash, grid, setGrid} = useContext(editorContext);

    return (
        <Stack className={styles.controls} spacing={4}>
            <Stack className={styles.top} spacing={2} direction="row">
                <ColorsSelector></ColorsSelector>
                <Stack spacing={2}>
                    <NullableBooleanSelector
                        setting={bright}
                        changeSetting={setBright}
                        optionIcon={<LightModeIcon fontSize="small" sx={{mr: 1}}/>}
                    >Bright</NullableBooleanSelector>
                    <NullableBooleanSelector
                        setting={flash}
                        changeSetting={setFlash}
                        optionIcon={<FlashOnIcon fontSize="small" sx={{mr: 1}}/>}
                    >Flash</NullableBooleanSelector>
                    <HistoryControls></HistoryControls>
                    <NullableBooleanSelector
                        setting={grid}
                        changeSetting={setGrid}
                        optionIcon={<GridOnIcon fontSize="small" sx={{mr: 1}}/>}
                        labels={['On', 'Dashed', 'Off']}
                    >Grid</NullableBooleanSelector>
                    <FileControls></FileControls>
                </Stack>
            </Stack>
            <SymbolsSelector></SymbolsSelector>
        </Stack>
    );
}