/* eslint-disable simple-import-sort/imports */
import { MailOutlined,LockOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import Layout from "Layouts/Layout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "Redux/Slices/AuthSlice";

export default function Signin() {
  const isLoggedIn=localStorage.getItem('isLoggedIn')||false;
    const { Title, Text } = Typography;
    const [form]=Form.useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();
  async function loginAsGuest(){
      const response = await dispatch(signin({email:'guest@gmail.com',password:123456})); // first this user should be register
        if(response?.payload?.data) {
            navigate("/book-list");
        }
    }
    // const state = useSelector((state) => state.auth);
async function onFinish(values){
    console.log("values ",values);
        const response = await dispatch(signin(values));
        if(response?.payload?.data) {
            navigate("/book-list");
        }
        form.resetFields();
}
  
    return (
        <Layout>
            <div className="w-full flex flex-col items-center justify-center bg-blue-50 text-black">
                <div className="sm:min-w-[400px]">

              
            <Title level={3} className="text-center">Login to your account</Title>
               <Text className="mb-4 justify-center flex">
                        Do not have an account ?  
                        <Link to="/signup" className="hover:!text-blue-500">
                               {'  Sign Up'}
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
          <Flex dir="horizontal" className="mb-4 -mt-4 px-1" gap={8} justify="end">
{  !isLoggedIn &&  <Link to='/forgot-password' className="text-blue-600 hover:text-blue-500">Forgot Password ?</Link>
}{          isLoggedIn && <Link to='/reset-password' className="text-blue-600 hover:text-blue-500">Reset Password</Link>
}          </Flex>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" className="bg-blue-600">
             Submit
            </Button>
          </Form.Item>
                </Form>
                <Button  className="bg-green-600 w-full mt-4 hover:!btn-success" onClick={loginAsGuest} >
             Login as Guest
            </Button>
                </div>
                </div>
        </Layout>
    );
}