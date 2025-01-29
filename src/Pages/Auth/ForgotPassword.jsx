import { Steps } from "antd";
import Layout from "Layouts/Layout";
import { useState } from "react";

import Credential from "./Credential";
import SetNewPassword from "./SetNewPassword";
import Verifiction from "./Verification";


const ForgotPassword = () => {
  const [current,setCurrent ] = useState(0);
 function setCurrentPage(){
  if(current<2)
  setCurrent(current+1);
 }
 
  const steps = [
    {
      key:0,
      title: 'Credential',
      content: <Credential setCurrentPage={setCurrentPage} />
    },
    {
      key:1,
      title: 'Verification',
      content: <Verifiction setCurrentPage={setCurrentPage} />,
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
<div className="h-[calc(100vh-100px)] flex flex-col items-center pt-40 bg-blue-50 mx-auto px-10">
<Steps current={current} items={steps} />
<div className="my-10">{steps[current].content}</div>
{/* {current < steps.length - 1 && (
  <div className="w-full flex justify-end">
        
          </div>
        )} */}
</div>
</Layout>
  );
};

export default ForgotPassword;
