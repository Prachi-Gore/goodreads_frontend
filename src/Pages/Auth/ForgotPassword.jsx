import { Button, Form, Steps } from "antd";
import Layout from "Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestOtp, setForgotPassword, verifyOtp } from "Redux/Slices/AuthSlice";

import Credential from "./Credential";
import SetNewPassword from "./SetNewPassword";
import Verifiction from "./Verification";


const ForgotPassword = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const current=useSelector(state=>state.auth.current);

//   const [current,setCurrent ] = useState(0);
//  function getCurrentPage(){
//   if(current<2)
//   setCurrent(current+1);
//  }
  const [form] = Form.useForm();
    const onFinishHandler = async (values) => {
      console.log("Success:", values);
      if(current==0){
        localStorage.setItem('email',values.email)
   await dispatch(requestOtp(values));
      }else if(current===1){
        localStorage.setItem('otp',values.otp)
       await dispatch(verifyOtp({
          email:localStorage.getItem('email'),
          ...values}));
      }else{
        // current===2
       const response= await dispatch(setForgotPassword({
        email:localStorage.getItem('email'),
        new_password:values?.new_password
       }));
       console.log("response forgot password ",response)
       if(response?.payload?.data) {
        navigate("/signin");
    }
      }
      return;
    };
  const steps = [
    {
      key:0,
      title: 'Credential',
      content: <Credential/>
    },
    {
      key:1,
      title: 'Verification',
      content: <Verifiction />,
    },
    {
      key:2,
      title: 'Set New Password',
      content: <SetNewPassword/>,
    },
  ];
 
  return (
<Layout>
<div className="h-full flex flex-col items-center pt-40 bg-blue-50 mx-auto px-10">
{/* <Steps current={current} items={steps} /> */}
<Form
          name="forgot_password"
          form={form}
          onFinish={onFinishHandler}
          layout="vertical"
          className="sm:min-w-[400px]"
           autoComplete="off"
>
{/* <div className="my-10"> */}
  {steps[current].content}
{/* </div> */}


<Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" >
            {current===2?'Submit':'Next'}
            </Button>
          </Form.Item>
</Form>
</div>
</Layout>
  );
};

export default ForgotPassword;
