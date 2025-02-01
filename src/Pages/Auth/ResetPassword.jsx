import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import Layout from "Layouts/Layout";
import toast from "react-hot-toast";

const { Title } = Typography;

export default function ResetPassword() {
 

  const onFinish = (values) => {
    if(values.oldPassword===values.newPassword){
      console.log("Received values of form: ", values);
    toast.error("New password should not match with Old password");
    }
  };


  return (
     <Layout>
      <div className="h-full flex flex-col items-center justify-center bg-blue-50">
      <div className="w-1/4 min-w-[300px]">
        <div className="text-white" >
          <Title level={3}  >Change Password</Title>
        </div>
        <Form
          name="normal_login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please enter your Old Password!",
              },
            ]}
          >
             <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Old Password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please enter your New Password!",
              },
              {
                min:6,
                message: "Password should contain atleast 6 characters!",
              },
              {
                max:10,
                message: "Password should not contain more than 10 characters!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" className="bg-blue-600">
             Reset password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
     </Layout>
  );
}
