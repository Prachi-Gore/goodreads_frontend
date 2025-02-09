import { MailOutlined } from "@ant-design/icons";
import {  Form, Input, Typography } from "antd";

export default function Credential(){
    const { Text, Title } = Typography;
    // const [form] = Form.useForm();

    // const onFinish = (values) => {
    //   console.log("Success:", values);
    //   getCurrentPage();
    // };
     
    return (
        <div >
         <div className="text-white mb-4" >
          <Title level={4} className="!mb-0" >Credential</Title>
          <Text>
          You wiil receive verification code on below id
          </Text>
        </div>
        {/* <Form
          name="credential"
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="sm:min-w-[400px]"
           autoComplete="off"
        > */}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              }
            ]}
          >
             <Input
              prefix={<MailOutlined/>}
              placeholder="Email"
            />
          </Form.Item>
          
        {/* </Form> */}
      </div>
    );
}