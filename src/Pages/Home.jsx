import { Button, Space } from 'antd';
import Logo from 'Assets/Images/logo-color.png';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate=useNavigate();
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
    useEffect(()=>{
        if(isLoggedIn){
            navigate('book-list');
        }
    },[]);
    return (
            <div className="flex flex-col items-center justify-center gap-y-20 h-[100vh] bg-yellow-300">

                <div className="h-48 w-48">
                    <img 
                        className='w-full h-full'
                        alt="logo"
                        src={Logo}
                    />
                </div>

                <div className='flex  justify-between items-center '>
                    <div className='text-center  font-semibold basis-1/2'>
                        <h1 className='text-white text-5xl tracking-widest leading-normal'>
                            BookShelf <br/>
                            <span className='text-[#301934] '>
                                Your personal library and social network for bookworms
                            </span>
                        </h1>
                    </div>
                    <Space size={50} className='flex-1 justify-center h-fit'wrap>
                        <Button onClick={()=>navigate('signup')} className='bg-white text-2xl' size='large' type='dashed'>
                            Register
                        </Button>
                        <Button onClick={()=>navigate('signin')} className='bg-[#1677ff] text-2xl'size='large' type='dashed'>
                           Login
                        </Button>
                    </Space>
                </div>

            </div>
    );
}
