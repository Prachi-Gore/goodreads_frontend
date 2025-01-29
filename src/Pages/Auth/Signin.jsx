/* eslint-disable simple-import-sort/imports */
import { MailOutlined,LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import Layout from "Layouts/Layout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "Redux/Slices/AuthSlice";

export default function Signin() {
    const { Title, Text } = Typography;
    const [form]=Form.useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const state = useSelector((state) => state.auth);
async function onFinish(values){
    console.log("values ",values);
        const response = await dispatch(signin(values));
        if(response?.payload?.data) {
            navigate("/dashboard");
        }
        form.resetFields();
}
    // const [signinDetails, setSignInDetails] = useState({
    //     email: '',
    //     password: '',
    // });

    // function handleFormChange(e) {
    //     const {name, value} = e.target;
    //     setSignInDetails({
    //         ...signinDetails,
    //         [name]: value
    //     });
    // }

    // function resetForm() {
    //     setSignInDetails({
    //         email: '',
    //         password: '',
    //     });
    // }
    
    // async function onFormSubmit(e) {
    //     e.preventDefault();
    //     const response = await dispatch(signin(signinDetails));
    //     if(response?.payload?.data) {
    //         navigate("/dashboard");
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

              
            <Title level={5} className="text-center">Login to your account</Title>
               <Text className="mb-4 justify-center flex">
                        Do not have an account ?  
                        <Link to="/signup">
                            {/* <button className="btn btn-success rounded-md px-2 mx-5 hover:bg-green-400"> */}
                               {' Sign Up'}
                            {/* </button> */}
                        </Link>
                </Text>
                {/* <div className="w-full">
                    <form onSubmit={onFormSubmit} className="flex flex-col justify-center items-center w-3/4 mx-auto" autoComplete="off">
                        <div className="my-5 w-1/3 text-black">
                            <input
                                autoComplete="off"
                                type="email"
                                placeholder="email..."
                                className="px-8 py-3 bg-white w-full"
                                name="email"
                                onChange={handleFormChange}
                                value={signinDetails.email}
                            />
                        </div>
                        <div className="my-5 w-1/3 text-black">
                            <input
                                autoComplete="off"
                                type="password"
                                placeholder="password..."
                                className="px-8 py-3 bg-white w-full"
                                name="password"
                                onChange={handleFormChange}
                                value={signinDetails.password}
                            />
                        </div>
                        <Link to='/forgot-password' className="text-black flex justify-end w-1/3">Forgot Password ?</Link>
                        <div className="my-5 w-1/3">
                            <button className="btn btn-success rounded-md px-2 py-1 w-full hover:bg-green-400" type="submit">
                                Submit
                            </button>
                        </div>
                        <div className="flex text-black justify-end underline w-1/3">

                        <Link to='/reset-password'>Reset Password</Link>
                        
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
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
             Submit
            </Button>
          </Form.Item>
                </Form>
                <Button type="primary" className="w-full mt-4 btn-success hover:!bg-green-800" >
             Login as Guest
            </Button>
                </div>
                </div>
        </Layout>
    );
}