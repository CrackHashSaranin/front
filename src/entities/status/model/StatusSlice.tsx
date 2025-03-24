import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "./Status";

interface Value {
    value: Status | null;
}

const value: Value = { value: null };

const slice = createSlice(
    {
        name: "status",
        initialState: value,
        reducers: {
            setStatus: (state, action: PayloadAction<Status>) => {
                state.value = action.payload;
            },
        },
    }
);

export const { setStatus } = slice.actions;
export default slice.reducer;