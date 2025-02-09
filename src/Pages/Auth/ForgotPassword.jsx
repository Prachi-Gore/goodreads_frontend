import { Button, Form, Steps } from "antd";
import Layout from "Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp } from "Redux/Slices/AuthSlice";

import Credential from "./Credential";
import SetNewPassword from "./SetNewPassword";
import Verifiction from "./Verification";


const ForgotPassword = () => {
  const dispatch=useDispatch();
  const current=useSelector(state=>state.auth.current);

//   const [current,setCurrent ] = useState(0);
//  function getCurrentPage(){
//   if(current<2)
//   setCurrent(current+1);
//  }
  const [form] = Form.useForm();
  const loginId=Form.useWatch((values) =>{console.log("values ",values);return values.email},form);

    const onFinish = (values) => {
      console.log("Success:", values);
      // getCurrentPage();
      if(current==0){
   dispatch(requestOtp(values));
      }
      return;
    };
  const steps = [
    {
      key:0,
      title: 'Credential',
      content: <Credential />
    },
    {
      key:1,
      title: 'Verification',
      content: <Verifiction loginId={loginId} />,
    },
    {
      key:2,
      title: 'Set New Password',
      content: <SetNewPassword />,
    },
  ];
 
  return (
<Layout>
<div className="h-full flex flex-col items-center pt-40 bg-blue-50 mx-auto px-10">
<Steps current={current} items={steps} />
<Form
          name="forgot-password"
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="sm:min-w-[400px]"
           autoComplete="off"
>
<div className="my-10">{steps[current].content}</div>


<Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" className="bg-blue-600">
             Next
            </Button>
          </Form.Item>
</Form>
</div>
</Layout>
  );
};

export default ForgotPassword;
