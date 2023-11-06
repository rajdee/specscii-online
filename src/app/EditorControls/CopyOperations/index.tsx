import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import CopyAllIcon from '@mui/icons-material/CopyAll';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';

import { useCopyOperations } from './useCopyOperations';

export const CopyOperations = () => {
    const {
        handleCopy,
        handleFill,
        toggleSelect,
        isSelected,
        isSelectedMode
    } = useCopyOperations();

    return (
        <ButtonGroup
            variant="outlined"
        >
            <Button
                variant={
                    isSelectedMode
                        ? 'contained'
                        : 'outlined'
                }
                startIcon={<HighlightAltIcon />}
                onClick={toggleSelect}
            >
                Select
            </Button>
            <Button
                startIcon={<CopyAllIcon />}
                disabled={!isSelected}
                onClick={handleCopy}
            >
                Copy
            </Button>
            <Button
                startIcon={<FormatPaintIcon />}
                disabled={!isSelected}
                onClick={handleFill}
            >
                Fill
            </Button>
        </ButtonGroup>
    );
};
