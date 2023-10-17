import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CanvasField } from '@/app/models/canvas-field';

import type { RootState } from '@/app/store';

const initialState = {
    fieldsMap: [] as Array<CanvasField>
};

export const fieldsSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        updateFieldsMap: (state, action: PayloadAction<Array<CanvasField>>) => {
            state.fieldsMap = action.payload;
        },
    },
})

export const { updateFieldsMap } = fieldsSlice.actions;

export const fieldsMapSelector = (state: RootState) => state.fields.fieldsMap;

export default fieldsSlice.reducer;
