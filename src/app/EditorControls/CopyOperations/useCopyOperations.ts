import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks/useStore';

import { editorStateSelector, updateEditorState } from '@/app/store/Editor/editorSlice';

type CopyOperationsProps = {
    handleCopy: () => void;
    handleFill: () => void;
    toggleSelect: () => void;
    isSelected: boolean;
    isSelectedMode: boolean;
}

export const useCopyOperations = ():CopyOperationsProps => {
    const dispatch = useAppDispatch();
    const editorState = useAppSelector(editorStateSelector);

    const handleCopy = useCallback(
        () => {

        }, []
    );

    const handleFill = useCallback(
        () => {

        }, []
    );

    const toggleSelect = useCallback(
        () => {
            dispatch(
                updateEditorState({
                    isSelectedMode: !editorState.isSelectedMode
                })
            )
        }, [dispatch, editorState.isSelectedMode]
    );


    return {
        isSelected: false,
        handleCopy,
        handleFill,
        toggleSelect,
        isSelectedMode: editorState.isSelectedMode,
    }
};
