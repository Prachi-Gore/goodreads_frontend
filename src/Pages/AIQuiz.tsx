import { Button, Drawer, Flex, Form, Input, Radio } from "antd"
import {SendOutlined } from '@ant-design/icons';
import { AppDispatch, RootState } from 'Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { quizType } from "Redux/type";


const AIQuiz=({openAgent,onClose}:any)=>{
      const dispatch = useDispatch<AppDispatch>()
    
    const quizState = useSelector((state:RootState) => state.quiz);

    return(
         <Drawer
          width={640}
        title="AI Generated QUIZ & Evaluation"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={openAgent}
      >
        <Form
        
        initialValues={quizState?.quizList}>
 {
quizState?.quizList?.map((quizItem:quizType,quizIndex:number)=><Flex key={quizIndex}>
{quizItem?.question}
<Radio
opt={quizItem?.options?.map((option)=>({
    label:option,
    value:option
}))}
/>
</Flex>)
 }
        </Form>
        </Drawer>
    )
}

export default AIQuiz