import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
   bookList: [],
   bookDetails: {},  // For individual book details
   loading: false
};

export const getAllBooks = createAsyncThunk("course/getAllBooks", async (searchTitle) => {
    try {
        const response = axiosInstance.get(`books/?search=${searchTitle || ''}`);
        toast.promise(response, {
            loading: 'loading books data',
            success: 'Successfully loaded all the books',
            error: "Something went wrong"
        });
        return await response;
    } catch(error) {
        toast.error("Something went wrong, cannot download books");
    }
});

// get individual book details

export const getBookDetails = createAsyncThunk("course/getBookDetails", async (id) => {
    try {
        const response = axiosInstance.get(`book/${id}`);
        toast.promise(response, {
            loading: 'loading book data',
            success: 'Successfully loaded book details',
            error: "Something went wrong"
        });
        console.log('response ', (await response).data);
        return await response;
    } catch(error) {
        toast.error("Something went wrong, cannot download book");
    }
});



const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            if(action?.payload?.data) {
                state.bookList = action?.payload?.data;
                state.loading = false;
            }
        });
        builder.addCase(getAllBooks.pending, (state) => {
                state.loading = true;
        });
        builder.addCase(getAllBooks.rejected, (state) => {
                state.loading = false;
        });

        // individual book details
        builder.addCase(getBookDetails.fulfilled, (state, action) => {
            console.log('state bookDetails',state,action);
            if(action?.payload?.data) {
                state.bookDetails = action?.payload?.data;
            }
        });
    }
});

export default bookSlice.reducer;