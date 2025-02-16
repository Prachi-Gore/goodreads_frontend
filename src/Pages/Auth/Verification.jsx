import { Button, Flex, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";

export default function Verifiction() {
    const [timer, setTimer] = useState(30);
    const { Title, Text } = Typography;
    
    useEffect(() => {
        const interval = timer > 0 && setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div>
            <Title level={5}>
                We have sent code to your email {localStorage.getItem('email')}
            </Title >
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
                    <Button type="link" className={`!bg-blue-50 underline flex justify-start px-0 w-fit ${timer === 0 ? 'hover:underline hover:!text-blue-500' : ''}`} disabled={timer > 0} onClick={() => setTimer(30)}>Resend code</Button>
                    {timer > 0 && <Text>Please wait {timer} seconds before requesting another code.</Text>}
                </Flex>
        </div>
    );
}