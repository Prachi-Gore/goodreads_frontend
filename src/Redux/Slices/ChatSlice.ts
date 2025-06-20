import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";
import { UserStatusListType } from "Redux/type";


const initialState={
    userStatusList:[] as UserStatusListType,
    notificationList:[],
    unreadNotification:0 as number,
    userGroupList:[],
    chatMessages:[],
    shouldFetchChat: false,
}
export const getUserStatusList=createAsyncThunk<{data:UserStatusListType},string,{ rejectValue: string }>("chat/getUserStatusList",async(accessToken,{rejectWithValue})=>{
    try{
const response:any=axiosInstance.get('chat/user-group/',{
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
const response=axiosInstance.post('chat/user-group/',data,{
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
    const response=axiosInstance.put('chat/user-group/status/',data,{
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
    // toast.promise(response,{
    //     loading: 'loading notification',
    //     success: 'Successfully loaded all notifications',
    //     error: "Something went wrong"
    // })
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

export const getUserGroupList=createAsyncThunk<any,string,{ rejectValue: string }>("chat/getUserGroupList",async(accessToken,{rejectWithValue})=>{
    try{
const response:any=axiosInstance.get('chat/user-group/combined-list/',{
    headers:{Authorization:`Bearer ${accessToken}`}
})
toast.promise(response,{
    loading: 'loading user group list',
    success: 'Successfully loaded all user and group',
    error: "Something went wrong"
})
// console.log('user status data',await response)
return await response

    }catch(error:any){
        toast.error("Something went wrong, cannot load user group list");
        console.log("error ",error?.response?.data)
        return rejectWithValue(error?.response?.data)
    }
})

export const addMessage=createAsyncThunk<any,{data:any,accessToken:string},{ rejectValue: string }>("chat/addMessage",async({data,accessToken},{rejectWithValue})=>{
    try{
const response:any=axiosInstance.post('chat/messages/',data,{
    headers:{Authorization:`Bearer ${accessToken}`}
})
toast.promise(response,{
    loading: 'Sending Message',
    success: 'Message sent',
    error: "Something went wrong"
})
return await response

    }catch(error:any){
        toast.error("Something went wrong, cannot send message");
        console.log("error ",error?.response?.data)
        return rejectWithValue(error?.response?.data)
    }
})

export const getMessages=createAsyncThunk<any,{chatId:string | undefined,chatType:string | undefined,accessToken:string},{ rejectValue: string }>("chat/getMessages",async({chatId,chatType,accessToken},{rejectWithValue})=>{
    try{
const response:any=axiosInstance.get(`chat/messages/?${chatType}=${chatId}`,{
    headers:{Authorization:`Bearer ${accessToken}`}
})
toast.promise(response,{
    loading: 'loading messages',
    success: 'Successfully loaded all messages',
    error: "Something went wrong"
})
// console.log('user status data',await response)
return await response

    }catch(error:any){
        toast.error("Something went wrong, cannot load messages");
        console.log("error ",error?.response?.data)
        return rejectWithValue(error?.response?.data)
    }
})

const chatSlice=createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setShouldFetchChat: (state, action) => {
            state.shouldFetchChat = action.payload;
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserStatusList.fulfilled,(state,action)=>{
            // console.log("action?.payload ",action)
            if(action?.payload?.data)
            state.userStatusList=action?.payload?.data
        });
        builder.addCase(getNotificationList.fulfilled,(state,action)=>{
            const unreadNotification=action?.payload?.data?.filter((notification: { is_read: boolean })=>!notification?.is_read)?.length
            if(action?.payload?.data){
            state.notificationList=action?.payload?.data
            state.unreadNotification=unreadNotification
            }
        });
        builder.addCase(getUserGroupList.fulfilled,(state,action)=>{
            if(action?.payload?.data){
            state.userGroupList=action?.payload?.data
            }
        });
        builder.addCase(getMessages.fulfilled,(state,action)=>{
            if(action?.payload?.data){
                state.chatMessages=action?.payload?.data
            }
        });
    }
})

export const { setShouldFetchChat } = chatSlice.actions;
export default chatSlice.reducer;