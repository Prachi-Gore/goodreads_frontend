import { Button, Input, Space } from 'antd';
import Layout from 'Layouts/Layout';
import { SendOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserGroupList } from 'Redux/Slices/ChatSlice';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'Redux/store';


const ChatArea = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const accessToken = useSelector((state:RootState) => state.auth.token.access);
  const userGroupList = useSelector((state:RootState) => state.chat.userGroupList);
  const messages:any=[]
  
 useEffect(()=>{
  dispatch(getUserGroupList(accessToken))

 },[])


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
                onClick={()=>navigate(`/chat-area/${item.id}`)}
                className="p-3 bg-white shadow rounded-md cursor-pointer hover:bg-gray-200 transition"
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
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-md w-fit ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t flex gap-2">
            <Input className="flex-grow" placeholder="Type a message..." />
            <Button type="primary" icon={<SendOutlined />}>
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
