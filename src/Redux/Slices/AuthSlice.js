import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";

import AUTH_ACCESS from "Constants/constant";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    username: localStorage.getItem('username') || '',
    token: JSON.parse(localStorage.getItem('token')) || {refresh:'',access:''},
    current: localStorage.getItem('current') || 0,
    accessList:[],
    userId:localStorage.getItem('userId') || null
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

export const logout=createAsyncThunk("auth/logout",async({data,accessToken},{rejectWithValue})=>{
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
    return rejectWithValue(error.response?.data);
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

// Reset Password(known old password)   
export const resetPassword=createAsyncThunk("auth/resetPassword",async({data,accessToken})=>{
    try{
const response=axiosInstance.post("reset_password/",data,{
    headers:{Authorization:`Bearer ${accessToken}`}});
    toast.promise(response,{
        loading: 'Password Reset is in progress',
        success: 'Password Reset Successfully!',
        error: "Something went wrong"
    });
    return await response;
}catch(error){
    console.log("password reset error",error);
    const errorMsg=error?.response?.data?.err;
    if(errorMsg) {
        toast.error(errorMsg);
    } else {
        toast.error("Cannot Reset Password, something went wrong");
    }
    }
});
// Forgot Password using otp

export const requestOtp=createAsyncThunk("auth/requestOtp",async(data,{rejectWithValue})=>{
try{
const response=axiosInstance.post("request_otp/",data);
toast.promise(response,{
    loading: 'Generating OTP',
    success: 'OTP Sent Successfully!',
    error: "Something went wrong"
});
return await response;
}catch(error){
    const errorMsg=error?.response?.data?.err;
    console.log("otp generate error ",error)
    if(errorMsg) {
        toast.error(errorMsg);
    } else {
        toast.error("Cannot Sent OTP, something went wrong");
    }
    return rejectWithValue(error.response?.data);
}
});

export const verifyOtp=createAsyncThunk("auth/verifyOtp",async(data,{rejectWithValue})=>{
    try{
    const response=axiosInstance.post("verify_otp/",data);
    toast.promise(response,{
        loading: 'OTP Verification In Progress',
        success: 'OTP Verification Done!',
        error: "Something went wrong"
    });
    return await response;
    }catch(error){
        const errorMsg=error?.response?.data?.err;
        console.log("otp verification error ",error)
        if(errorMsg) {
            toast.error(errorMsg);
        } else {
            toast.error("Cannot Verify OTP, something went wrong");
        }
        return rejectWithValue(error.response?.data);
    }
    });

    export const setForgotPassword=createAsyncThunk("auth/setForgotPassword",async(data,{rejectWithValue})=>{
        try{
        const response=axiosInstance.post("forgot_password/",data);
        toast.promise(response,{
            loading: 'Setting Password',
            success: 'Password set Successfully!',
            error: "Something went wrong"
        });
        return await response;
        }catch(error){
            const errorMsg=error?.response?.data?.err;
            console.log("Password set error ",error)
            if(errorMsg) {
                toast.error(errorMsg);
            } else {
                toast.error("Cannot set Password, something went wrong");
            }
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
                state.userId=action?.payload?.data?.id;
                state.accessList=AUTH_ACCESS;
                localStorage.setItem("isLoggedIn", (action?.payload?.data != undefined));
                localStorage.setItem("username", action?.payload?.data?.username);
                localStorage.setItem("userId", action?.payload?.data?.id);
                localStorage.setItem("token", JSON.stringify(action?.payload?.data?.token));
            }
        }).addCase(logout.fulfilled, (state, action) => {
            if(action?.payload?.status===200) {
                state.isLoggedIn = false;
                state.username = '';
                state.userId = null;
                state.token = {refresh:'',access:''};
                state.accessList=[];
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
          state.userId = null;
          state.token = { refresh: "", access: "" };
          localStorage.clear();
        }).addCase(requestOtp.fulfilled,(state)=>{
            localStorage.setItem('current',1);
            state.current=1;
        }).addCase(verifyOtp.fulfilled,(state)=>{
            localStorage.setItem('current',2);
            state.current=2;
        }).addCase(setForgotPassword.fulfilled,(state)=>{
            localStorage.removeItem('current');
            localStorage.removeItem('email');
            localStorage.removeItem('otp');
            state.current=0;
        });
    }
});


export default authSlice.reducer;