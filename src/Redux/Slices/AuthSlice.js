import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    username: localStorage.getItem('username') || '',
    token: JSON.parse(localStorage.getItem('token')) || {refresh:'',access:''},
};
export const signup = createAsyncThunk("auth/signup", async (data) => {
    try {
        const response = axiosInstance.post("register/", data);
        toast.promise(response, {
            loading: 'Submitting form',
            success: 'Successfully signed up!!',
            error: "Something went wrong"
        });
        console.log('response signup ', (await response).data);
        return await response;
    } catch(error) {
        toast.error("Cannot register, something went wrong");
    }
});

export const signin = createAsyncThunk("auth/signin", async (data) => {
    try {
        const response = axiosInstance.post("login/", data);
        toast.promise(response, {
            loading: 'Submitting form',
            success: 'Successfully signed in!!',
            error: "Something went wrong"
        });
        console.log('response login ', (await response).data);
        return await response;
    } catch(error) {
        console.log("signin error",error);
        if(error?.response?.data?.err) {
            toast.error(error?.response?.data?.err);
        } else {
            toast.error("Cannot signin, something went wrong");
        }
    }
});

export const logout=createAsyncThunk("auth/logout",async({data,accessToken})=>{
    console.log("logout payload data ",accessToken);
try{
    const response = axiosInstance.post("logout/", data,{headers: { Authorization: `Bearer ${accessToken}` }});
    toast.promise(response, {
        loading: 'logout in progress',
        success: 'Successfully logout!!',
        error: "Something went wrong"
    });
    console.log('response logout ', (await response).data);
    return await response;
}catch(error){
    console.log("logout error",error);
    if(error?.response?.data?.err) {
        toast.error(error?.response?.data?.err);
    } else {
        toast.error("Cannot logout, something went wrong");
    }
}
});
// Refresh Token
export const refreshToken = createAsyncThunk("auth/refreshAccessToken", async (refresh, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("refresh_access_token/", { refresh });
      return response.data; // { access: "new_access_token" }
    } catch (error) {
      toast.error("Session expired. Please log in again."); // by passing refresh token we get new access token but when both token expired user has to login again
      return rejectWithValue(error.response?.data);
    }
  });
const authSlice = createSlice({
    name: 'auth',
    initialState,
    // reducers: {
    //     logout: (state) => {
    //         state.isLoggedIn = false;
    //         state.token = '';
    //         state.username = '';
    //         localStorage.clear();
    //     }
    // },
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            if(action?.payload?.data) {
                state.isLoggedIn = (action?.payload?.data != undefined);
                state.username = action?.payload?.data?.username;
                state.token = action?.payload?.data?.token;
                localStorage.setItem("isLoggedIn", (action?.payload?.data != undefined));
                localStorage.setItem("username", action?.payload?.data?.username);
                localStorage.setItem("token", JSON.stringify(action?.payload?.data?.token));
            }
        }).addCase(logout.fulfilled, (state, action) => {
            if(action?.payload?.status===200) {
                state.isLoggedIn = false;
                state.username = '';
                state.token = {refresh:'',access:''};
                localStorage.clear();
            }
        })
         // Handle Refresh Token
        .addCase(refreshToken.fulfilled, (state, action) => {
          state.token.access = action?.payload?.access;
          localStorage.setItem("token", JSON.stringify(state.token));
        })
        .addCase(refreshToken.rejected, (state) => {
          state.isLoggedIn = false;
          state.username = "";
          state.token = { refresh: "", access: "" };
          localStorage.clear();
        });
    }
});


export default authSlice.reducer;