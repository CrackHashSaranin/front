import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./id/model/IdSlice";
import statusReducer from "./status/model/StatusSlice";

export const store = configureStore({
    reducer: {
        id: idReducer,
        status: statusReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;