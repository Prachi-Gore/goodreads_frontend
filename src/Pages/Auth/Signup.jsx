import { LockOutlined,MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import Layout from "Layouts/Layout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "Redux/Slices/AuthSlice";
export default function Signup() {
    const { Text, Title } = Typography;
    const [form] = Form.useForm();

    const onFinish =async (values) => {
      console.log("Signup:", values);
      // delete values.confirmPassword	;
      const response = await dispatch(signup(values));
      console.log("response signup success ",response?.payload?.status)
          if(response?.payload?.status===201) {
              navigate("/signin");
          } 
         form.resetFields();
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    return (
        <Layout>
        <div className="h-full flex flex-col items-center justify-center bg-blue-50 text-black">
            <div className="sm:min-w-[400px]">
                <Title className="mb-4 justify-center flex" level={3}>Create a new account</Title>
                <Text className="mb-4 justify-center flex">
                    Already have an account ?  
                     <Link to="/signin" className="hover:!text-blue-500">
                          {` Sign In`}
                    </Link>
                </Text>
              <Form
                 name="signin"
                 form={form}
                 onFinish={onFinish}
                 layout="vertical"
                  className=""
                  autoComplete="off"
                >
                    <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "User Name is required!",
              },
              {
                // eslint-disable-next-line no-useless-escape
                pattern: /^[A-Za-z][A-Za-z0-9]*(?:[\s][A-Za-z][A-Za-z0-9]*)*$/,
                message: "User Name Only contains letter number and space!",
              }
            ]}
          >
             <Input
              prefix={<UserOutlined/>}
              placeholder="User Name"
            />
          </Form.Item>
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
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter Password!",
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
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password" 
            dependencies={['password']}
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit"className="bg-blue-600">
             Submit
            </Button>
          </Form.Item>
                </Form>
        </div>
        </div>
        </Layout>
    );
}