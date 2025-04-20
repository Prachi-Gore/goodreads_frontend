import { Button, Card, Col, Flex, Row, Space } from "antd"
import { CheckCircleTwoTone,CloseCircleTwoTone } from '@ant-design/icons';
import Layout from "Layouts/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserStatusList, sendConnection, updateConnection } from "Redux/Slices/ChatSlice";
import { useSelector } from "react-redux";
import { userStatusType } from "Redux/type";
import { AppDispatch, RootState } from "Redux/store";

// const data=[
//   {
//     userName:'abcde eee',
//     status:'add_friend' // default status
//   },
//   {
//     userName:'adfrr eee',
//     status:'pending' // i sent friend request
//   },
//   {
//     userName:'lklll eee',
//     status:'received' // i received friend request
//   },
//   {
//     userName:'abcde eee',
//     status:'add_friend' // default status
//   },
//   {
//     userName:'adfrr eee',
//     status:'pending' // i sent friend request
//   },
//   {
//     userName:'lklll eee',
//     status:'received' // i received friend request
//   }
// ]

const UserStatusList = () => {
  const accessToken = useSelector((state:RootState) => state.auth.token.access);
  const userStatusList=useSelector((state:RootState)=>state.chat.userStatusList)
  const dispatch = useDispatch<AppDispatch>()
  async function fetchUserStatusList(){
    await dispatch(getUserStatusList(accessToken));
   //  console.log("user status list ",response)
     
}
async function onSendConnection(receiverId:string){
const response=await dispatch(sendConnection({data:{receiver_id:receiverId},accessToken}));
if(response?.payload?.status===201){
  fetchUserStatusList();
}
 }
 async function onUpdateConnection(senderId:string,status:string){
  const response= await dispatch(updateConnection({data:{sender_id:senderId,status},accessToken}));
  console.log('onUpdateConnection ',response)
  if(response?.payload?.status===200){
    fetchUserStatusList();
  }
   }
    
  useEffect(()=>{fetchUserStatusList()},[dispatch])
    
    return( 
  <Layout>
    <div className="bg-green-100  w-full px-4">
 <Row gutter={[16,16]} className=" flex justify-center  my-4">
   {
      userStatusList?.map((user:userStatusType)=>(
        <Col xs={24} sm={12} md={8} lg={6}  key={user.id} >
        <Card className="h-full">
          <Flex gap={20} className='' align='center' justify='center'>
          <span className="font-mono">{user?.username}</span>
          <Space>
            {function getUserStausComponent(){
              switch(user?.status) {
                case 'Friends':
                   return <CheckCircleTwoTone  twoToneColor="#52c41a" />
                case 'Pending':
                  return <Button color="primary" variant="dashed">Pending</Button>
                case 'Accept_Reject':
                  return <Space> <Button  variant="dashed"  onClick={()=>{onUpdateConnection(user?.id,'accepted')}} icon={<CheckCircleTwoTone  twoToneColor="#52c41a" />}>Accept</Button><Button  variant="dashed" onClick={()=>{onUpdateConnection(user?.id,'rejected')}} icon={<CloseCircleTwoTone twoToneColor="#ff4d4f"  />}>Reject</Button></Space>
                default:
                  return <Button color="primary" variant="dashed" onClick={()=>onSendConnection(user?.id)} >Send Connection</Button>
              }
            }()}
          </Space>
          </Flex>
        </Card>
        </Col>
            ))
   }

    </Row>
    </div>
    </Layout>
    )

  
}

export default UserStatusList
