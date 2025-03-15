import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import Layout from "Layouts/Layout";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "Redux/Slices/AuthSlice";

const { Title } = Typography;

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const form=Form.useForm();
const authState = useSelector((state) => state.auth);
    const parsToken=authState?.token;
    const accessToken=parsToken?.access;
  const onFinish = async(values) => {
    if(values.old_password===values.new_password){
    toast.error("New password should not match with Old password");
    return;
    }
  const response=await dispatch(resetPassword({data:values,accessToken}));
  console.log("reset password response ",response);
  if(response?.payload?.status===200) {
    navigate("/signin");
    form.resetFields();
}
  };


  return (
     <Layout>
      <div className="w-full flex flex-col items-center justify-center bg-blue-50">
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
            name="old_password"
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
            name="new_password"
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
