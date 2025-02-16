import { UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "Redux/Slices/AuthSlice";

export default function Navbar() {
const navigate=useNavigate();
const [current, setCurrent] = useState('mail');
function onShelfClick() {
  navigate("/shelf");
  }

function onClick(e){
  console.log("onclick e ",e)
  if(e.keyPath?.length==1){
    setCurrent(e.key);
  }else{
    setCurrent('SubMenu')
  }
}
    const authState = useSelector((state) => state.auth);
    console.log('authState?.token ',authState?.token);
    const parsToken=authState?.token;
    const refreshToken=parsToken?.refresh;
    const accessToken=parsToken?.access;

    // console.log('accessToken ',accessToken,typeof parsToken);
    const dispatch = useDispatch();
   async function onLogout() {
    
      const response= await dispatch(logout({data:{refresh:refreshToken},accessToken}));
      if(response?.payload?.status===200){
        navigate('/dashboard');
      }
    }
    const items = [
      {
        label:<span onClick={()=>navigate('/dashboard')} >Books</span>,
        key: 'mail',
      },
      {
        label: <span onClick={onShelfClick} >Bookshelf</span>,
        key: 'app',
      },
      {
        label:<><Avatar className='bg-white' icon={<UserOutlined className='!text-black' />} shape="square" /> {authState?.username}</>,
        key: 'SubMenu',
      //   type: 'group',
        children: [
          {
            
            label:<span className='' onClick={()=>navigate('/signup')} >Signup</span> ,
            key: 'signup',
          },
          {
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
        // <div className="navbar bg-red-900 px-20 fixed top-0 z-20 h-[76px]">
        //     <div className="flex-1">
        //         <Link to="/dashboard" className="btn btn-success-content normal-case text-xl btn-secondary">BookShelf</Link>
        //     </div>
        //     <div className="flex-none">
        //         <ul className="menu menu-horizontal px-1 text-white text-xl">
        //             { authState.isLoggedIn && <li><p onClick={onShelfClick} className="">Shelfs</p></li> }
        //             { authState.isLoggedIn && <li><p className="" >{authState.username}</p></li> }
        //             <li>
        //                 <details>
        //                     <summary className="" >Options</summary>
        //                     <ul className="p-2 text-base z-10 bg-white text-black">
        //                         {authState.isLoggedIn && <li><Link to="/signin" onClick={onLogout}>Logout</Link></li>}
        //                         {!authState.isLoggedIn && <li><Link to="/signup" >Signup</Link></li>}
        //                         {!authState.isLoggedIn && <li><Link to="/signin" >Signin</Link></li>}

        //                     </ul>
        //                 </details>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
        <Menu  mode="horizontal" theme='dark' className='!text-white flex justify-end' items={items} onClick={onClick} selectedKeys={[current]}/>
    );
}