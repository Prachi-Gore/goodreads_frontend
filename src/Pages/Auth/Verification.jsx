import { Button, Flex, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";

export default function Verifiction({ setCurrentPage }) {
    const [form] = Form.useForm();
    const [timer, setTimer] = useState(30);
    const { Title, Text } = Typography;
    const loginId = "p*****@gmail.com";
    function onFinish(values) {
        console.log("values verification", values);
        setCurrentPage();
    }
    useEffect(() => {
        const interval = timer > 0 && setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div>
            <Title level={5}>
                We have sent code to your email {loginId}
            </Title >
            <Form
                name="verification"
                form={form}
                onFinish={onFinish}
                layout="vertical"
                 className="sm:min-w-[400px]"
                 autoComplete="off"
            >
                <Form.Item
                    name="otp"
                    className="verification-code mt-4"
                    rules={[
                        {
                            required: true,
                            message: "OTP is required!",
                        },
                        {
                            min: 6,
                            message: "OTP is incomplete!",
                        },
                        {
                            pattern: "^[a-zA-Z0-9]+$", // only alphanumeric
                            message: "OTP is incorrect!",
                        }
                    ]}
                >
                    <Input.OTP variant="filled" />
                </Form.Item>
                <Flex vertical className="mb-4">
                    <Button type="link" className={`!text-blue-500 flex justify-start px-0 w-fit ${timer === 0 ? 'hover:underline hover:!text-blue-500' : ''}`} disabled={timer > 0} onClick={() => setTimer(30)}>Resend code</Button>
                    {timer > 0 && <Text>Please wait {timer} seconds before requesting another code.</Text>}
                </Flex>
                <Form.Item style={{ marginBottom: "0px" }}>
                    <Button block="true" type="primary" htmlType="submit" className="bg-blue-600" >
                        Verify
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}