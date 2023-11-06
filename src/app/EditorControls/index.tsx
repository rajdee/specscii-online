import Stack from '@mui/material/Stack';

import GridOnIcon from '@mui/icons-material/GridOn';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useEditor } from '../hooks/useEditor';

import ColorsSelector from './ColorsSelector';
import SymbolsSelector from './SymbolsSelector';
import {FileControls} from '@/app/EditorControls/FileControls';
import {HistoryControls} from '@/app/EditorControls/HistoryControls';
import {NullableBooleanSelector} from '@/app/EditorControls/NullableBooleanSelector';

import styles from './editor-controls.module.css';
import { CopyOperations } from './CopyOperations';

export default function EditorControls() {

    const {
        editorState: {
            bright,
            flash,
            grid
        },
        setGrid,
        setFlash,
        setBright,
    } = useEditor();


    return (
        <Stack className={styles.controls} spacing={4}>
            <Stack className={styles.top} spacing={2} direction="row">
                <ColorsSelector />
                <Stack spacing={2}>
                    <CopyOperations />

                    <NullableBooleanSelector
                        setting={bright}
                        optionIcon={<LightModeIcon fontSize="small" sx={{mr: 1}}/>}
                        changeSetting={setBright}
                    >
                        Bright
                    </NullableBooleanSelector>
                    <NullableBooleanSelector
                        setting={flash}
                        optionIcon={<FlashOnIcon fontSize="small" sx={{mr: 1}}/>}
                        changeSetting={setFlash}
                    >
                        Flash
                    </NullableBooleanSelector>
                    <HistoryControls></HistoryControls>
                    <NullableBooleanSelector
                        setting={grid}
                        labels={['On', 'Dashed', 'Off']}
                        optionIcon={<GridOnIcon fontSize="small" sx={{mr: 1}}/>}
                        changeSetting={setGrid}
                    >
                        Grid
                    </NullableBooleanSelector>
                    <FileControls />
                </Stack>
            </Stack>
            <SymbolsSelector />
        </Stack>
    );
}
