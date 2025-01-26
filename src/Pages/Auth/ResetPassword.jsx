import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import Layout from "Layouts/Layout";

const { Text, Title } = Typography;

export default function ResetPassword() {
 

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };


  return (
     <Layout>
      <div className="h-[100vh] flex flex-col items-center justify-center bg-yellow-200">
      <div className="w-1/3">
        <div className="text-white" >
          <Title level={3}  >Change Password</Title>
          {/* <Text className="bg-white -mt-12">
           New password should not match with old password.
          </Text> */}
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="oldPassword"
            rules={[
              {
                type: "password",
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
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" className="bg-[#1677ff]">
             Reset password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
     </Layout>
  );
}
