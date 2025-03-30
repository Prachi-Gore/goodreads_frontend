import Layout from 'Layouts/Layout';

const ChatArea = () => {
  return (
   <Layout>
          {/* Main Content */}
          <div className="flex flex-grow">
        {/* Left Sidebar - User List */}
        <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="font-semibold mb-3">Users</h2>
          <ul className="space-y-2">
            {Array.from({ length: 20 }, (_, i) => (
              <li
                key={i}
                className="p-3 bg-white shadow rounded-md cursor-pointer hover:bg-gray-200 transition"
              >
                User {i + 1}
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Chat Area */}
        <div className="w-2/3 flex flex-col border-l">
          <div className="flex-grow p-4 overflow-y-auto space-y-3">
            <h2 className="font-semibold">Chat</h2>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`p-3 rounded-md w-fit ${
                  i % 2
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                Message {i + 1}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t flex gap-2">
            <Input className="flex-grow" placeholder="Type a message..." />
            <Button type="primary">Send</Button>
          </div>
        </div>
      </div>

   </Layout>
  )
}

export default ChatArea;
