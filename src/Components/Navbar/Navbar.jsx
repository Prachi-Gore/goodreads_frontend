import { Avatar, Badge, Dropdown, Menu } from "antd";
import { Header } from 'antd/es/layout/layout';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "Redux/Slices/AuthSlice";
import { getNotificationList, markAllRead } from "Redux/Slices/ChatSlice";
// import { WechatOutlined } from '@ant-design/icons';
import NotificationContent from "Components/Navbar/NotificationContent";

export default function Navbar() {
const navigate=useNavigate();
// const [current, setCurrent] = useState();
function onShelfClick() {
  navigate("/shelf");
  }

// function onClick(e){
//   console.log("onclick e ",e)
//   // if(e.keyPath?.length==1){
//     setCurrent(e.key);
//   // }else{
//   //   setCurrent('auth')
//   // }
// }
    const authState = useSelector((state) => state.auth);
    console.log('authState?.token ',authState?.token);
    const parsToken=authState?.token;
    const refreshToken=parsToken?.refresh;
    const accessToken=parsToken?.access;
const notificationList=useSelector((state)=>state.chat.notificationList)
const unreadNotification=useSelector((state)=>state.chat.unreadNotification)
    // console.log('accessToken ',accessToken,typeof parsToken);
    const dispatch = useDispatch();
   async function handleOpenChange(open){
      if(!open&&unreadNotification>0){
        console.log('is open ',open)
        // mark all message as read
        const response= await  dispatch(markAllRead(accessToken))
        if(response?.payload?.status===200){
          dispatch(getNotificationList(accessToken))
        }
      }
    }
   async function onLogout() {
      const response= await dispatch(logout({data:{refresh:refreshToken},accessToken}));
      if(response?.payload?.status===200){
        navigate('/book-list');
      }
    }
    useEffect(()=>{
      if(authState.isLoggedIn){
        dispatch(getNotificationList(accessToken))
      }
    },[])

console.log("notificationList ",notificationList)
    const items = [
      authState.isLoggedIn  && {
        label:<Avatar className='bg-white' icon={<img width="32" height="32" src="https://img.icons8.com/material-outlined/32/chat.png" alt="chat"/>} shape="square" />,
        key: 'chat',
        children:[
          {
            label:<span onClick={()=>navigate('/user-status-list')} >User status list</span>,
            key:'user-status-list'
          },
          {
            label:<span onClick={()=>navigate('/group')} >Group</span>,
            key:'group'
          },
          {
            label:<span onClick={()=>navigate('/chat-area')} >Chat</span>,
            key:'chat-area'
          }
        ]
      },
     authState.isLoggedIn  && {
        label:<Dropdown
        dropdownRender={() => <NotificationContent notificationList={notificationList}/>}
        // menu={<NotificationContent notificationList={notificationList} />}
        trigger={['hover']}  // 'click'
        onOpenChange={handleOpenChange}
        placement="bottomRight"
        arrow
      > <Badge  count={unreadNotification} overflowCount={10}>
        <Avatar shape="square"  className='bg-white' icon={<img width="32" height="32" src="https://img.icons8.com/carbon-copy/32/bell--v1.png" alt="bell--v1"/>} />
      </Badge>

      </Dropdown>
      ,
      key:'notificationcount',
      // children:[
      //   {
      //     label:<div>
      //       {
      //         notificationList?.map(item=>item.message||'kl')
      //       }  
      //     </div>,
      //     key:'notificationmsg'
      //   }
      // ]
      },
      {
        label:<Avatar className='bg-white' icon={<img width="32" height="32" src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/32/external-bookshelf-education-smashingstocks-hand-drawn-black-smashing-stocks.png" alt="external-bookshelf-education-smashingstocks-hand-drawn-black-smashing-stocks"/>} shape="square" />,
        key: 'bookfeature',
        // type: 'group',
        children: [
          {
            label:<span onClick={()=>navigate('/book-list')} >Books</span>,
            key: 'booklist',
          },
          authState.isLoggedIn  && {
            label: <span onClick={onShelfClick} >Bookshelf</span>,
            key: 'bookshelf',
          },
        ],
      },
      {
        label:<Avatar className='bg-white' icon={<img width="32" height="32" src="https://img.icons8.com/parakeet-line/32/name.png" alt="name"/>} shape="square" />,
        key: 'auth',
        // type: 'group',
        children: [
          authState.isLoggedIn  &&  {
            
            label:<span>{authState?.username}</span> ,
            key: 'userDetails',
          },
        authState?.username!=='Guest'  &&{
            
            label:<span className='' onClick={()=>navigate('/signup')} >Signup</span> ,
            key: 'signup',
          },
        authState?.username!=='Guest' && {
            label: <span onClick={()=>navigate('/signin')}>Signin</span>,
            key: 'signin',
          },
          authState.isLoggedIn  && {
              label: <span onClick={onLogout} >Logout</span>,
              key: 'logout',
            },
        ],
      }
  ];

    return (
        <Header className='bg-red-900 text-white z-10 sticky top-0 w-full items-center'>
        <Menu  mode="horizontal" theme='dark' className='bg-inherit menu-text-color  justify-end' items={items} />
        </Header>
    );
}