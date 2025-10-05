import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";
import { quizType,quizEvaluationType } from "Redux/type";

const initialState={
    quizList:[] as quizType[],
    quizEvaluation:{} as quizEvaluationType
}
export const quizGenerate=createAsyncThunk<any,{data:{book_id:string},accessToken:string},{ rejectValue: string }>('chat/sendConnection',async({data,accessToken},{rejectWithValue})=>{
try{
const response=axiosInstance.post('generate_quiz/',data,{
    headers:{Authorization:`Bearer ${accessToken}`}
})
toast.promise(response, {
            loading: 'Generating Quiz',
            success: 'Quiz created Successfully',
            error: "Something went wrong"
        });
        return await response;
}catch(error:any) {
        toast.error("Something went wrong, cannot create quiz");
        return rejectWithValue(error?.response?.data);

    }
})

export const quizEvaluation=createAsyncThunk<any,{data:{book_id:string},accessToken:string},{ rejectValue: string }>('chat/sendConnection',async({data,accessToken},{rejectWithValue})=>{
try{
const response=axiosInstance.post('evaluate_answers/',data,{
    headers:{Authorization:`Bearer ${accessToken}`}
})
toast.promise(response, {
            loading: 'Evaluating Answer',
            success: 'Answer Evaluated Successfully',
            error: "Something went wrong"
        });
        return await response;
}catch(error:any) {
        toast.error("Something went wrong, cannot evaluate quiz");
        return rejectWithValue(error?.response?.data);

    }
})

const quizSlice=createSlice(
    {
        name:'quiz',
        initialState: initialState,
        reducers:{},
        extraReducers:(builder)=>{
                builder.addCase(quizGenerate.fulfilled,(state,action)=>{
                    if(action?.payload?.data)
                    state.quizList=action?.payload?.data
                });
                   builder.addCase(quizEvaluation.fulfilled,(state,action)=>{
                    if(action?.payload?.data)
                    state.quizEvaluation=action?.payload?.data
                });
            }
    }
)

export default quizSlice.reducer;