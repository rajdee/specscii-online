import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';

import { CanvasField } from "@/app/models/canvas-field";

import { fieldsMapSelector, updateFieldsMap } from "@/app/store/Fields/fieldsSlice";

export const useFieldsMap = () => {

    const fieldsMap = useAppSelector(fieldsMapSelector);
    const dispatch = useAppDispatch();

    const setFieldsMap = useCallback(
        (payload: Array<CanvasField>) => dispatch(
            updateFieldsMap(payload)
        ), [ dispatch ]
    );

    return {
        fieldsMap,
        setFieldsMap
    };
};
