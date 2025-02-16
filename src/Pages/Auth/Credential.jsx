import { MailOutlined } from "@ant-design/icons";
import {  Form, Input, Typography } from "antd";

export default function Credential(){
    const { Text, Title } = Typography;
    
     
    return (
        <div >
         <div className="text-white mb-4" >
          <Title level={4} className="!mb-0" >Credential</Title>
          <Text>
          You wiil receive verification code on below id
          </Text>
        </div>
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
      </div>
    );
}