import { List } from "antd";

const NotificationContent = ({notificationList}:any)=> 
    <div className="w-80 max-h-96 overflow-y-auto bg-white shadow-lg rounded-md">
      <List
        itemLayout="horizontal"
        dataSource={notificationList}
        locale={{ emptyText: <span className="text-gray-500">No notifications</span> }}
        renderItem={(item:any) => (
          <List.Item className={`${!item.is_read ?'bg-blue-100':''}`}>
            <List.Item.Meta className='px-2'
            //   avatar={<Avatar icon={<BellOutlined />} />}
              title={item.message}
            //   description={item.description}
            />
          </List.Item>
        )}
      />
    </div>

export default NotificationContent