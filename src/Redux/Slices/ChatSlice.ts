import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";
import { UserStatusListType } from "Redux/type";


const initialState={
    userStatusList:[] as UserStatusListType,
    notificationList:[],
    unreadNotification:0 as number
}
export const getUserStatusList=createAsyncThunk<{data:UserStatusListType},string,{ rejectValue: string }>("chat/getUserStatusList",async(accessToken,{rejectWithValue})=>{
    try{
const response:any=axiosInstance.get('chat/user-status/',{
    headers:{Authorization:`Bearer ${accessToken}`}
})
toast.promise(response,{
    loading: 'loading user status',
    success: 'Successfully loaded all user status',
    error: "Something went wrong"
})
// console.log('user status data',await response)
return await response

    }catch(error:any){
        toast.error("Something went wrong, cannot load user status");
        console.log("error ",error?.response?.data)
        return rejectWithValue(error?.response?.data)
    }
})

export const sendConnection=createAsyncThunk<any,{data:{receiver_id:string},accessToken:string},{ rejectValue: string }>('chat/sendConnection',async({data,accessToken},{rejectWithValue})=>{
try{
const response=axiosInstance.post('chat/user-status/',data,{
    headers:{Authorization:`Bearer ${accessToken}`}
})
toast.promise(response, {
            loading: 'Sending Connection',
            success: 'Connection created Successfully',
            error: "Something went wrong"
        });
        return await response;
}catch(error:any) {
        toast.error("Something went wrong, cannot create review");
        return rejectWithValue(error?.response?.data);

    }


})

export const updateConnection=createAsyncThunk<any,{data:{sender_id:string,status:string},accessToken:string},{ rejectValue: string }>('chat/sendConnection',async({data,accessToken},{rejectWithValue})=>{
    try{
    const response=axiosInstance.put('chat/user-status/update/',data,{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
    toast.promise(response, {
                loading: 'Updating Connection',
                success: 'Connection updated Successfully',
                error: "Something went wrong"
            });
            return await response;
    }catch(error:any) {
            toast.error("Something went wrong, cannot create review");
            return rejectWithValue(error?.response?.data);
    
        }
    })

export const getNotificationList=createAsyncThunk<{data:any},string,{ rejectValue: string }>("chat/getNotificationList",async(accessToken,{rejectWithValue})=>{
        try{
    const response:any=axiosInstance.get('chat/notifications/',{
        headers:{Authorization:`Bearer ${accessToken}`}
    })
    toast.promise(response,{
        loading: 'loading notification',
        success: 'Successfully loaded all notifications',
        error: "Something went wrong"
    })
    // console.log('user status data',await response)
    return await response
    
        }catch(error:any){
            toast.error("Something went wrong, cannot load user status");
            console.log("error ",error?.response?.data)
            return rejectWithValue(error?.response?.data)
        }
    })  
// here any is return response type
export const markAllRead=createAsyncThunk<any,{accessToken:string},{ rejectValue: string }>('chat/notifications/markAllRead',async(accessToken,{rejectWithValue})=>{
        try{
        const response=axiosInstance.post('chat/notifications/mark-all-read/',{},{
            headers:{Authorization:`Bearer ${accessToken}`}
        })
        // toast.promise(response, {
        //             loading: 'Sending Connection',
        //             success: 'Connection created Successfully',
        //             error: "Something went wrong"
        //         });
                return await response;
        }catch(error:any) {
                toast.error("Something went wrong, cannot update read status");
                return rejectWithValue(error?.response?.data);
        
            }
        
        
        })    
// create group
export const createGroup=createAsyncThunk<any,{data:{name:string,member_ids:string[]},accessToken:string},{ rejectValue: string }>("chat/createGroup",async({data,accessToken},{rejectWithValue})=>{
    try{
const response:any=axiosInstance.post('chat/group/',data,{
    headers:{Authorization:`Bearer ${accessToken}`}
})
toast.promise(response,{
    loading: 'Creating group',
    success: 'Successfully created group',
    error: "Something went wrong"
})
return await response

    }catch(error:any){
        toast.error("Something went wrong, cannot create group");
        console.log("error ",error?.response?.data)
        return rejectWithValue(error?.response?.data)
    }
})

const chatSlice=createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {

    },
    extraReducers:(builder)=>{
        builder.addCase(getUserStatusList.fulfilled,(state,action)=>{
            // console.log("action?.payload ",action)
            if(action?.payload?.data)
            state.userStatusList=action?.payload?.data
        });
        builder.addCase(getNotificationList.fulfilled,(state,action)=>{
            // console.log("action?.payload ",action)
            const unreadNotification=action?.payload?.data?.filter((notification: { is_read: boolean })=>!notification?.is_read)?.length
            if(action?.payload?.data){
            state.notificationList=action?.payload?.data
            state.unreadNotification=unreadNotification
            }
        });
    }
})

export default chatSlice.reducer;