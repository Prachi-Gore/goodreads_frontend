import { Button, Flex, Input, Space } from 'antd';
import Layout from 'Layouts/Layout';
import { SendOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage, getMessages, getUserGroupList, setShouldFetchChat } from 'Redux/Slices/ChatSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'Redux/store';
import * as dayjs from 'dayjs';


const ChatArea = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [chatType,setChatType]=useState<string>()
  const [content,setContent]=useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const accessToken = useSelector((state:RootState) => state.auth.token.access);
  const userId=useSelector((state:RootState)=>state.auth.userId)
  const userGroupList = useSelector((state:RootState) => state.chat.userGroupList);
  const shouldFetchChat = useSelector((state:RootState) => state.chat.shouldFetchChat);
const chatMessages=  useSelector((state:RootState) => state.chat.chatMessages);
async function onSendClick(){
  const payloadData={[chatType==='user'?'receiver':'group']:id,content:content}
  const response= await dispatch(addMessage({data:payloadData,accessToken}))
  if(response?.payload?.status===201) {
    setContent('')
  await  dispatch(getMessages({chatId:id,chatType,accessToken}))
  }
}

 useEffect(()=>{
  dispatch(getUserGroupList(accessToken))
  setChatType(userGroupList?.find((item:any)=>item.id===id)?.type)
 },[])

 useEffect(()=>{
  console.log('shouldFetchChat ',shouldFetchChat)
  if(id && shouldFetchChat){
    dispatch(getMessages({chatId:id,chatType,accessToken}))
    dispatch(setShouldFetchChat(false))
    return;
  }
  if(id){
    dispatch(getMessages({chatId:id,chatType,accessToken}))
    return;
    }
 },[id,shouldFetchChat])

//  useEffect(()=>{
//   if(shouldFetchChat){
    
//     dispatch(setShouldFetchChat(false))

//   }
//  },[shouldFetchChat])


  return (
   <Layout>
          <div className="flex flex-grow">
        {/* Left Sidebar - User List */}
        <aside className="w-1/3 bg-gray-100 flex flex-col">
          {/* Fixed Header */}
          <div className="p-4 border-b bg-white">
            <h2 className="font-semibold">Users</h2>
          </div>

          {/* Scrollable List */}
          <ul className="flex-grow overflow-y-auto p-4 space-y-2">
            {userGroupList.map((item:{type:string,username:string,name:string,id:string}, index:number) => (
              <li
                key={index}
                onClick={()=>{
                  setChatType(item.type)
                  setContent('')
                  navigate(`/chat-area/${item.id}`)
                }}
                className={`p-3 shadow rounded-md cursor-pointer hover:bg-gray-200 transition  ${id===item.id?'bg-blue-200':'bg-white'}`}
              >
                <Space className='flex justify-between'>
                  <span> {item.type==='user'?item.username:item.name}</span>
                 {item.type==='group' && <span><UsergroupAddOutlined /></span>}
                </Space>
               
              </li>
            ))}
          </ul>
        </aside>

        {/* Right - Chat Area */}
        <div className="w-2/3 flex flex-col border-l">
          {/* Fixed Chat Header */}
          <div className="p-4 border-b bg-white">
            <h2 className="font-semibold">Chat</h2>
          </div>
{id?<>
          {/* Scrollable Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg:any) => (
              <div
                key={msg.id}
                className={`p-3 rounded-md w-fit ${
                  msg.sender.id === userId
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                <Flex vertical>
                  <div className={`text-sm flex justify-between gap-x-16 ${ msg.sender.id === userId ?'text-blue-200':'text-gray-400'}`}>
<span>{msg.sender.id === userId?'You':msg.sender.username}</span>
<span>{dayjs(msg.created_at)?.format('D MMM YYYY hh:mm a')}</span>
                  </div>
                  <div>
                {msg.content}
                </div>
                
                </Flex>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t flex gap-2">
            <Input className="flex-grow" placeholder="Type a message..." value={content} onChange={(e:any)=>{
              console.log('e content',e.target.value)
              setContent(e.target.value)}} />
            <Button type="primary" icon={<SendOutlined />} onClick={onSendClick} disabled={!content}>
              Send
            </Button>
          </div>
          </>:<div className="flex items-center justify-center h-full text-gray-500 text-xl font-semibold">
        Please select a user or group to start chatting.
      </div>}
        </div>
      </div>


   </Layout>
  )
}

export default ChatArea;
