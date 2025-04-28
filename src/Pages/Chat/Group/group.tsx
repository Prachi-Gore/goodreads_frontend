import { Button, Col, Form, Input, Row, Select } from "antd";
import Layout from "Layouts/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createGroup, getUserStatusList } from "Redux/Slices/ChatSlice";
import { AppDispatch, RootState } from "Redux/store";

const Group = () => {
  const [groupForm]=Form.useForm();
  const accessToken = useSelector((state:RootState) => state.auth.token.access);
  const userStatusList=useSelector((state:RootState)=>state.chat.userStatusList)
   const dispatch = useDispatch<AppDispatch>()
    async function fetchUserStatusList(){
      await dispatch(getUserStatusList(accessToken));
       
  }
 async function groupOnfinish(values:any){
  // make api call to create group
 const response= await dispatch(createGroup({data:values,accessToken}))
 console.log("values ",values,response)

 if(response?.payload?.status===201) {
  groupForm.resetFields();
 }
  }
  useEffect(()=>{
    fetchUserStatusList()
  },[])

  return (
    <Layout>
           <Form
                    name="review"
                    form={groupForm}
                    onFinish={groupOnfinish}
                    layout="horizontal"
                     className="pt-8 w-full"
                     autoComplete="off"

                   >
                    <Row gutter={[16,16]} className="flex justify-center ">
                      <Col xs={24} md={8} lg={6} className="">
                       <Form.Item
               name="name"
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
              name="member_ids"
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
                        options={userStatusList?.map((user:{username:string,id:string})=>({
                          label:user.username,
                          value:user.id
                        }))}
                      />
             </Form.Item>
             </Col>
             {/* <Form.Item style={{ marginBottom: "0px" }} className='flex justify-end' > */}
             <Col xs={24} md={8} lg={6} className="flex justify-end">
               <Button  type="primary" htmlType="submit"className="bg-blue-600 mt-1" >
                Create
               </Button>
               </Col>
             {/* </Form.Item> */}
             </Row>
                   </Form>
   </Layout>               
  )
}

export default Group
