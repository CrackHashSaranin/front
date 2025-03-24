import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Id } from "./Id";

interface Value {
    value: Id | null;
}

const value: Value = { value: null };

const slice = createSlice(
    {
        name: "id",
        initialState: value,
        reducers: {
            setId: (state, action: PayloadAction<Id>) => {
                state.value = action.payload;
            },
            clearId: (state) => {
                state.value = null;
            },
        },
    }
);

export const { setId, clearId } = slice.actions;
export default slice.reducer;