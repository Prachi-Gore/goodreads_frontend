import { MailOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";

export default function Credential({onFinish,onFinishFailed,form}){
    const { Text, Title } = Typography;
    
     
    return (
        <div >
         <div className="text-white mb-4" >
          <Title level={3} className="!mb-0" >Credential</Title>
          <Text className="bg-white">
          You wiil receive verification code on below id
          </Text>
        </div>
        <Form
          name="credential"
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
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
        </Form>
      </div>
    );
}