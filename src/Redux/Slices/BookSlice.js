import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
   bookList: [],
   bookDetails: {},  // For individual book details
   loading: false,
   reviews:[]
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

// update book details like rating and shelf corresponding to book

export const updateBookDetails=createAsyncThunk("course/updateBookDetails",async({data,id,accessToken},{rejectWithValue})=>{
try{
const response=axiosInstance.patch(`book/${id}`,data,{
    headers:{Authorization:`Bearer ${accessToken}`}
});
toast.promise(response,{
    loading: 'Book Details Update is in progress',
    success: 'Book Details Updated Successfully!',
    error: "Something went wrong"
});
return await response;
}catch(error){
    const errorMsg=error?.response?.data?.err;
    if(errorMsg) {
        toast.error(errorMsg);
    } else {
        toast.error("Cannot Reset Password, something went wrong");
    }
    return rejectWithValue(error.response?.data);
}
});

// export const getAllReviews = createAsyncThunk("reviews/getAll", async ({rejectWithValue}) => {
//     try {
//         const response = axiosInstance.get('reviews/');
//         console.log('getAllReviews ',response)
//         toast.promise(response, {
//             loading: 'loading reviews',
//             success: 'Successfully loaded all reviews',
//             error: "Something went wrong"
//         });
//         return await response;
//     } catch(error) {
//         toast.error("Something went wrong, cannot download reviews");
//         return rejectWithValue(error.response?.data);

//     }
// });

export const createReview = createAsyncThunk("reviews/create", async ({data,accessToken},{rejectWithValue}) => {
    try {
        const response = axiosInstance.post('reviews/',data,{headers: { Authorization: `Bearer ${accessToken}` }});
        toast.promise(response, {
            loading: 'Creating Review',
            success: 'Review created Successfully',
            error: "Something went wrong"
        });
        return await response;
    } catch(error) {
        toast.error("Something went wrong, cannot create review");
        return rejectWithValue(error.response?.data);

    }
});

export const updateReview = createAsyncThunk("reviews/update", async ({data,id,accessToken},{rejectWithValue}) => {
    try {
        const response = axiosInstance.patch(`review/${id}`,data,{headers: { Authorization: `Bearer ${accessToken}` }});
        toast.promise(response, {
            loading: 'Updating Review',
            success: 'Review updated Successfully',
            error: "Something went wrong"
        });
        return await response;
    } catch(error) {
        toast.error("Something went wrong, cannot update review");
        return rejectWithValue(error.response?.data);

    }
});

export const deleteReview = createAsyncThunk("reviews/delete", async ({id,accessToken},{rejectWithValue}) => {
    try {
        const response = axiosInstance.delete(`review/${id}`,{headers: { Authorization: `Bearer ${accessToken}` }});
        toast.promise(response, {
            loading: 'Deleting Review',
            success: 'Review deleted Successfully',
            error: "Something went wrong"
        });
        return await {...response,id};  // as we are not getting deleted review id from backend so we are attaching it from our side and will use it in addCase
    } catch(error) {
        toast.error("Something went wrong, cannot delete review");
        return rejectWithValue(error.response?.data);

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
                state.reviews=state.bookDetails.reviews;
            }
        });

        builder.addCase(updateBookDetails.fulfilled, (state, action) => {
            console.log('updated bookDetails',state,action);
            if(action?.payload?.data) {
                state.bookDetails = action?.payload?.data;
            }
        });

        // reviews
        builder.addCase(createReview.fulfilled,(state,action)=>{
            if(action?.payload?.data){
                console.log("review add ",action?.payload?.data)
                state.reviews=[action?.payload?.data?.data,... state.reviews];
            }
        });
        builder.addCase(updateReview.fulfilled,(state,action)=>{
            if(action?.payload?.data?.data?.id){
                const review=action?.payload?.data?.data;
                console.log("review update ",review);
                state.reviews=state.reviews?.map(ritem=>{
                   return ritem?.id===review?.id ? {...ritem,review:review.review,updated_at:review.updated_at}:ritem;
            });
            }
        });
        builder.addCase(deleteReview.fulfilled,(state,action)=>{
            console.log("review delete ",action);
            const deletedReviewId=action?.payload?.id;
            if(deletedReviewId){
                state.reviews=state.reviews?.filter(ritem=>(
                    ritem?.id!==deletedReviewId )
                );
            }
        });
    }
});

export default bookSlice.reducer;