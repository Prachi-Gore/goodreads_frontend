import { Steps } from "antd";
import Layout from "Layouts/Layout";
import { useState } from "react";

import Credential from "./Credential";
import SetNewPassword from "./SetNewPassword";
import Verifiction from "./Verification";


const ForgotPassword = () => {
  const [current,setCurrent ] = useState(0);
 function getCurrentPage(){
  if(current<2)
  setCurrent(current+1);
 }
 
  const steps = [
    {
      key:0,
      title: 'Credential',
      content: <Credential getCurrentPage={getCurrentPage} />
    },
    {
      key:1,
      title: 'Verification',
      content: <Verifiction getCurrentPage={getCurrentPage} />,
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
