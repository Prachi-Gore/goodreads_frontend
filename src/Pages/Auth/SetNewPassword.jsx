import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function SetNewPassword(){
    const navigate=useNavigate()
    const [form] = Form.useForm();
    const onFinish=(values)=>{
console.log('values ',values);
navigate('/signin');
    }

    return (
        <div >
             <Form
          form={form}
          name="set_new_password"
          onFinish={onFinish}
          layout="vertical"
          className="sm:min-w-[400px]"
          autoComplete="off"
        >
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
             Set New password
            </Button>
          </Form.Item>
        </Form>
        </div>
    );
}