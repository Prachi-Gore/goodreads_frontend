import { Button, Input } from 'antd';
import Layout from 'Layouts/Layout';
import { SendOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';

const users = Array.from({ length: 20 }, (_, i) => `User ${i + 1}`);
const messages = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  text: `Message ${i + 1}`,
  sender: i % 2 === 0 ? "user" : "friend",
}));
const ChatArea = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  
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
            {users.map((user, index) => (
              <li
                key={index}
                onClick={()=>navigate(`/chat-area/${index}`)}
                className="p-3 bg-white shadow rounded-md cursor-pointer hover:bg-gray-200 transition"
              >
                {user}
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
