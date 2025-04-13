import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from 'Redux/Slices/AuthSlice';
import bookSliceReducer from 'Redux/Slices/BookSlice';
import shelfSliceReducer from 'Redux/Slices/ShelfSlice';
import chatSliceReducer from 'Redux/Slices/ChatSlice';

export default configureStore({
    reducer: {
        auth: authSliceReducer,
        book: bookSliceReducer,
        shelf: shelfSliceReducer,
        chat: chatSliceReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;