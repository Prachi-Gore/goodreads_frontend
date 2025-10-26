import { Button, Drawer, Flex, Form, Input, Radio, Space, Tag } from "antd"
import { AppDispatch, RootState } from 'Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { quizType } from "Redux/type";
import { useEffect, useRef } from "react";
import { clearQuizEvaluation, quizEvaluation, quizGenerate } from "Redux/Slices/AIQuiz";

function getValueIndex(index:Number){
  switch (index) {
    case 0:
      return "A"
    case 1:
      return "B"
    case 2:
      return "C"  
    case 3:
      return "D"  
    default:
      break;
  }
}

const AIQuiz=({openAgent,setOpenAgent,bookId}:any)=>{
      const [quizForm]=Form.useForm();
      const dispatch = useDispatch<AppDispatch>()
      const accessToken = useSelector((state:RootState) => state.auth.token.access);
const feedbackContainerRef = useRef<HTMLDivElement>(null);
    const quizState = useSelector((state:RootState) => state.quiz);
    // console.log('quizState ',quizState)
     const onClose = () => {
    quizForm.setFieldsValue({
      quizList:[]
    })
        setOpenAgent(false);
    dispatch(clearQuizEvaluation())
  };
   async function getQuize(){
       await dispatch(quizGenerate({data:{book_id:bookId},accessToken}))

    }
async function onFinishHandler(values:any){
  const updatedValues={
    quiz_details:quizState?.quizList,
    book_id: bookId,
    user_answers:values?.quizList?.map((quiz:any)=>quiz?.selected_answer)
  }
    // console.log('values ',updatedValues,values?.quizList)

const response=await dispatch(quizEvaluation({data:updatedValues,accessToken}))
if(response?.payload?.status===200){
  console.log("response ",response?.payload?.status===200,feedbackContainerRef.current)

if (feedbackContainerRef.current) {
feedbackContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });  }
}
}
useEffect(  ()=>{
  if(openAgent){
    getQuize()
  }
},[openAgent])

    return(
         <Drawer
          width={640}
          // width='auto'
        title="AI Generated QUIZ & Evaluation"
        closable={true} 
        onClose={onClose}
        open={!quizState?.isQuizGenerating && openAgent}
      >
       {quizState?.quizEvaluation?.feedback?  
       
       <Space direction="vertical" ref={feedbackContainerRef} className=" mb-6 w-full"
       
       >
          <span>
        <Tag color="blue" className=" font-semibold">Score: </Tag> {quizState?.quizEvaluation?.score}</span>
        <span>
        <Tag color="orange" className=" font-semibold">Feedback: </Tag>{quizState?.quizEvaluation?.feedback}</span>
        </Space>        
:null}
       <Form
       onFinish={onFinishHandler}
       layout="vertical"
        name="quiz_submission_form"
        form={quizForm}
        >
        <Form.List name="quizList">
  {() => (
    <>
       {quizState?.quizList?.map((field:any,index:number) =>{
      console.log("field ",field)
    return (
        <Flex key={index}>
          
          <Form.Item key={index} name={[field.name,'question']} className="" /> 
            
          <Form.Item
          className="font-semibold"
          label={`${index+1}) ${field?.question}`} 
          rules={[{
            required:true,
            message:'please select answer'
          }]}
          key={index} 
          name={[index,'selected_answer']}>
          
          <Radio.Group
          className="font-normal flex flex-col"
            options={field?.options?.map((option:any,index:number) => ({
              label: option,
              value: getValueIndex(index),
            }))}
          />
          </Form.Item>
        </Flex>
      )
    }
      )}
    </>
  )}
</Form.List>

  <Form.Item style={{ marginBottom: "0px" }} className='flex justify-end' >
             <Button  type="primary" htmlType="submit"className="bg-blue-600" >
               Evaluate
             </Button>
           </Form.Item>
        </Form>
       
        </Drawer>
    )
}

export default AIQuiz