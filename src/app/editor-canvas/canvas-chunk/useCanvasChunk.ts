import { useContext, useRef, useState } from 'react';

import { CanvasPosition } from './canvas-chunk';

import { editorContext } from '@/app/models/editor-context';



export const useCanvasChunk = () => {
    const canvasRef = useRef(null);
    const [preview, setPreview] = useState<boolean>(false);
    const [canvasPosition, setCanvasPosition] = useState<CanvasPosition | null>(null);
    const { grid } = useContext(editorContext);

    return {
        grid,
        preview,
        canvasRef,
        canvasPosition,
        setPreview,
        setCanvasPosition
    };
};
