import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";

export default function Credential({getCurrentPage}){
    const { Text, Title } = Typography;
    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log("Success:", values);
      getCurrentPage();
    };
     
    return (
        <div >
         <div className="text-white mb-4" >
          <Title level={4} className="!mb-0" >Credential</Title>
          <Text>
          You wiil receive verification code on below id
          </Text>
        </div>
        <Form
          name="credential"
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="sm:min-w-[400px]"
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
          {/* <Button type="primary"className="bg-[#1677ff]"  onClick={() =>
            form
              .validateFields()
              .then(onFinish)
              .catch((err) => {
                console.log(err);
              })
          }>
            Next
          </Button> */}
           <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit">
             Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
}