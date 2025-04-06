import { Button, Col, Form, Input, Row, Select } from "antd";

const Group = () => {
  const [groupForm]=Form.useForm();
 async function groupOnfinish(values:any){
  // make api call to create group
  console.log("values ",values)
  }
  return (
           <Form
                    name="review"
                    form={groupForm}
                    onFinish={groupOnfinish}
                    layout="horizontal"
                     className="mt-8"
                     autoComplete="off"
                   >
                    <Row gutter={[16,16]} className="lg:px-10 ">
                      <Col xs={24} md={8} lg={6} className="">
                       <Form.Item
               name="group_name"
               rules={[
                 {
                   required: true,
                   message: "Name is required!",
                 }
               ]}
             >
                <Input
                placeholder="Group Name"
                className='py-2'
               />
             </Form.Item>
             </Col>
             <Col xs={24} md={8} lg={6}>
             <Form.Item 
              name="group_members"
              rules={[
                {
                  required: true,
                  message: "Please Select Group Member!",
                }
              ]}
             >
               <Select
                        size='large'
                        mode="multiple"
                        placeholder="Group Member"
                        options={[]}
                      />
             </Form.Item>
             </Col>
             {/* <Form.Item style={{ marginBottom: "0px" }} className='flex justify-end' > */}
             <Col xs={24} md={8} lg={6} className="">
               <Button  type="primary" htmlType="submit"className="bg-blue-600 mt-1" >
                Create
               </Button>
               </Col>
             {/* </Form.Item> */}
             </Row>
                   </Form>
  )
}

export default Group
