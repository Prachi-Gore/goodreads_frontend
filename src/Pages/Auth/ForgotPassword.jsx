import { Button, Form, Steps } from "antd";
import Layout from "Layouts/Layout";
import { useState } from "react";

import Credential from "./Credential";
import Verifiction from "./Verification";
import SetNewPassword from "./SetNewPassword";


const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [current,setCurrent ] = useState(0);
  const onFinish = (values) => {
    console.log("Success:", values);
    setCurrent(current + 1);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const steps = [
    {
      key:0,
      title: 'Credential',
      content: <Credential onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}/>
    },
    {
      key:1,
      title: 'Verification',
      content: <Verifiction />,
    },
    {
      key:2,
      title: 'Set New Password',
      content: <SetNewPassword />,
    },
  ];
 
  return (
//     <div>
// Enter verification code
// For your security, we have sent the code to your email p******@gmail.com.    </div>
<Layout>
<div className="h-[100vh] flex flex-col items-center justify-center bg-white mx-auto px-10 ">
<Steps current={current} items={steps} />
<div className="my-10">{steps[current].content}</div>
{current < steps.length - 1 && (
  <div className="w-full flex justify-end">
          <Button type="primary"className="bg-[#1677ff]"  onClick={() =>
            form
              .validateFields()
              .then(onFinish)
              .catch((err) => {
                console.log(err);
              })
          }>
            Next
          </Button>
          </div>
        )}
</div>
</Layout>
  );
};

export default ForgotPassword;
