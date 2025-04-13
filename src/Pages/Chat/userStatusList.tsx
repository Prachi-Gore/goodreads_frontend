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
async function onSendConnection(receiverId:string){
await dispatch(sendConnection({data:{receiver_id:receiverId},accessToken}));
 }
 async function onUpdateConnection(senderId:string,status:string){
  await dispatch(updateConnection({data:{sender_id:senderId,status},accessToken}));
   }
    async function fetchUserStatusList(){
      await dispatch(getUserStatusList(accessToken));
     //  console.log("user status list ",response)
       
  }
  useEffect(()=>{fetchUserStatusList()},[dispatch])
    
    return( 
  <Layout>
 <Row gutter={[16,16]} className=" h-fit">
   {
      userStatusList?.map((user:userStatusType)=>(
        <Col xs={24} md={8} lg={6} key={user.id} >
        <Card>
          <Flex gap={10}>
          {user?.username}
          <Space>
            {function getUserStausComponent(){
              switch(user?.status) {
                case 'Friends':
                  return <Button>Pending</Button>
                case 'Accept_Reject':
                  return <Space> <Button onClick={()=>{onUpdateConnection(user?.id,'accepted')}} icon={<CheckCircleTwoTone />}>Accept</Button><Button onClick={()=>{onUpdateConnection(user?.id,'rejected')}} icon={<CloseCircleTwoTone />}>Reject</Button></Space>
                default:
                  return <Button onClick={()=>onSendConnection(user?.id)} >Send Connection</Button>
              }
            }()}
          </Space>
          </Flex>
        </Card>
        </Col>
            ))
   }

    </Row>
    </Layout>
    )

  
}

export default UserStatusList
