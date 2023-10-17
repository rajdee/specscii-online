import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


import type { RootState } from '@/app/store';
import { UndoHistory, UndoStateValue } from '@/app/models/undo-state';

const initialState: UndoStateValue = {
    undoHistory: [],
    undoStepNumber: 0,
};

export const undoSlice = createSlice({
    name: 'undo',
    initialState,
    reducers: {
        setUndoHistory: (state, action: PayloadAction<UndoHistory>) => {
            state.undoHistory = action.payload
        },
        setUndoStepNumber: (state, action: PayloadAction<UndoStateValue['undoStepNumber']>) => {
            state.undoStepNumber = action.payload
        },
    },
})


// Actions
export const { setUndoHistory: setUndoHistoryAction, setUndoStepNumber: setUndoStepNumberAction} = undoSlice.actions;

// Selectors
export const undoSelector = (state: RootState) => state.undo;


export const undoHistorySelector = createDraftSafeSelector(
    undoSelector,
    undo => undo.undoHistory
);
export const undoStepNumberSelector = createDraftSafeSelector(
    undoSelector,
    undo => undo.undoStepNumber
);


export default undoSlice.reducer;
