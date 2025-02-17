import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
   shelfList: []
};
const accessToken=JSON.parse(localStorage.getItem("token"))?.access; 
console.log('accessToken shelf ',accessToken)   

export const getAllBookShelves = createAsyncThunk("course/getAllBookShelves", async () => {
    try {
        const response = axiosInstance.get("bookshelf/", {headers: {
            Authorization: `Bearer ${accessToken}`
        }});
        toast.promise(response, {
            loading: 'loading bookshelves data',
            success: 'Successfully loaded all the bookshelves',
            error: "Something went wrong"
        });
        return await response;
    } catch(error) {
        toast.error("Something went wrong, cannot download bookshelves");
    }
});

// export const addBookToShelf = createAsyncThunk("course/addBookToShelf", async (data) => {
//     try {
//         const response = axiosInstance.patch(`/bookshelf/${data.shelfName}/add/${data.bookId}/`, {}, {headers: {
//             Authorization: `Bearer ${accessToken}`
//         }});
//         toast.promise(response, {
//             loading: 'adding book to shelf data',
//             success: 'Successfully added book to shelf',
//             error: "Something went wrong"
//         });
        
//         return await response;
//     } catch(error) {
//         toast.error("Something went wrong, cannot download bookshelves");
//     }
// });

export const createShelf = createAsyncThunk("course/createShelf", async (data) => {
    try {
        const response = axiosInstance.post(`bookshelf/`, {name: data.shelfName}, {headers: {
            Authorization: `Bearer ${accessToken}`
        }});
        toast.promise(response, {
            loading: 'adding new shelf data',
            success: 'Successfully added new shelf',
            error: "Something went wrong"
        });
        
        return await response;
    } catch(error) {
        toast.error("Something went wrong, cannot download bookshelves");
    }
});

const shelfSlice = createSlice({
    name: 'shelf',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBookShelves.fulfilled, (state, action) => {
            console.log('action getAllBookShelves ',action);
            if(action?.payload?.data) {
                state.shelfList = action?.payload?.data;
            }
        });
    }
});

export default shelfSlice.reducer;