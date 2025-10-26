import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";
import { quizType,quizEvaluationType } from "Redux/type";

const initialState={
    quizList:[] as quizType[],
    quizEvaluation:{} as quizEvaluationType,
    isQuizGenerating:false as boolean
}
export const quizGenerate=createAsyncThunk<any,{data:{book_id:string},accessToken:string},{ rejectValue: string }>('generateQuiz',async({data,accessToken},{rejectWithValue})=>{
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

export const quizEvaluation=createAsyncThunk<any,{data:{quiz_details:any[],user_answers:string[],book_id:string},accessToken:string},{ rejectValue: string }>('evaluateAnswers',async({data,accessToken},{rejectWithValue})=>{
try{
const response=axiosInstance.post('evaluate_answers/',data,{
    headers:{Authorization:`Bearer ${accessToken}`,"Content-Type": "application/json"}
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
        reducers:{
            clearQuizEvaluation(state) {
   state.quizEvaluation = { score: 0, feedback: "" };
  }
        },
        extraReducers:(builder)=>{
                builder.addCase(quizGenerate.fulfilled,(state,action)=>{
                    // console.log('quizGenerate data',action)
                    if(action?.payload?.data?.quiz)
                    state.quizList=action?.payload?.data?.quiz
                    state.isQuizGenerating=false
                });
                 builder.addCase(quizGenerate.pending,(state,action)=>{
                    state.isQuizGenerating=true
                });
                builder.addCase(quizEvaluation.fulfilled,(state,action)=>{
                                       console.log('quizEvaluation data',action)
                    const response=action?.payload?.data
                    if(response){
state.quizEvaluation={score:response?.score,feedback:response?.feedback}
                    }
                    
                });
            }
    }
)
export const { clearQuizEvaluation } = quizSlice.actions
export default quizSlice.reducer;