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
      const response = await dispatch(signup(values));
          if(response?.data) {
              navigate("/signin");
          } 
         form.resetFields();
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const state = useSelector((state) => state.auth);

    // const [signupDetails, setSignupDetails] = useState({
    //     email: '',
    //     password: '',
    //     confirm_password:'',
    //     username: ''
    // });

    // function handleFormChange(e) {
    //     const {name, value} = e.target;
    //     setSignupDetails({
    //         ...signupDetails,
    //         [name]: value
    //     });
    // }

    // function resetForm() {
    //     setSignupDetails({
    //         email: '',
    //         password: '',
    //         confirm_password:'',
    //         username: ''
    //     });
    // }
    
    // async function onFormSubmit(e) {
    //     e.preventDefault();
    //     const response = await dispatch(signup(signupDetails));
    //     if(response?.data) {
    //         navigate("/signin");
    //     } 
    //     resetForm();
    // }

    // useEffect(() => {
    //     if(state.isLoggedIn) {
    //         navigate("/dashboard");
    //     }
    // }, []);

    return (
        <Layout>
        <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-blue-50 text-black">
            <div className="sm:min-w-[400px]">
                <Title className="mb-4 justify-center flex" level={3}>Create a new account</Title>
                <Text className="mb-4 justify-center flex">
                    Already have an account ? 
                    <Link to="/signin" className="hover:!text-blue-500">
                        {/* <button className="btn btn-success rounded-md px-2 mx-5 hover:bg-green-400"> */}
                            Sign In
                        {/* </button> */}
                    </Link>
                </Text>
           
            {/* <div className="w-full">
                <form onSubmit={onFormSubmit} className="flex flex-col justify-center items-center w-3/4 mx-auto" autoComplete="off">
                    <div className="my-5 w-1/3 text-black">
                        <input
                            autoComplete="off"
                            type="text"
                            placeholder="username..."
                            className="px-8 py-3 bg-white w-full"
                            name="username"
                            value={signupDetails.username}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-1/3 text-black">
                        <input
                            autoComplete="off"
                            type="email"
                            placeholder="email..."
                            className="px-8 py-3 bg-white w-full"
                            name="email"
                            value={signupDetails.email}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-1/3 text-black">
                        <input
                            autoComplete="off"
                            type="password"
                            placeholder="password..."
                            className="px-8 py-3 bg-white w-full"
                            name="password"
                            value={signupDetails.password}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-1/3 text-black">
                        <input
                            autoComplete="off"
                            type="password"
                            placeholder="confirm password..."
                            className="px-8 py-3 bg-white w-full"
                            name="confirm_password"
                            value={signupDetails.confirm_password}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-1/3">
                        <button className="btn btn-success rounded-md px-2 py-1 w-full hover:bg-green-400" type="submit">
                            Submit
                        </button>
                    </div>
                    
                </form>
            </div> */}
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
            name="confirmPassword"
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
            <Button block="true" type="primary" htmlType="submit">
             Submit
            </Button>
          </Form.Item>
                </Form>
        </div>
        </div>
        </Layout>
    );
}