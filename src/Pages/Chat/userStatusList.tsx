import { Button, Card, Col, Flex, Row, Space } from "antd"
import { CheckCircleTwoTone,CloseCircleTwoTone } from '@ant-design/icons';

// npm install @ant-design/icons --save
const data=[
  {
    userName:'abcde eee',
    status:'add_friend' // default status
  },
  {
    userName:'adfrr eee',
    status:'pending' // i sent friend request
  },
  {
    userName:'lklll eee',
    status:'received' // i received friend request
  },
  {
    userName:'abcde eee',
    status:'add_friend' // default status
  },
  {
    userName:'adfrr eee',
    status:'pending' // i sent friend request
  },
  {
    userName:'lklll eee',
    status:'received' // i received friend request
  }
]
const UserStatusList = () => {
  console.log("hi")
 return( 
 <Row gutter={[16,16]}>
   {
      data?.map((user,userId)=>(
        <Col xs={24} md={8} lg={6} key={userId} >
        <Card>
          <Flex>
          {user?.userName}
          <Space>
            {function getUserStausComponent(){
              switch(user?.status) {
                case 'pending':
                  return <Button>Pending</Button>
                case 'received':
                  return <Space> <Button icon={<CheckCircleTwoTone />}>Accept</Button><Button icon={<CloseCircleTwoTone />}>Reject</Button></Space>
                default:
                  return <Button>Add Friend</Button>
              }
            }()}
          </Space>
          </Flex>
        </Card>
        </Col>
            ))
   }

    </Row>
    )

  
}

export default UserStatusList
