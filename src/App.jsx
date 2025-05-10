import { useSelector } from 'react-redux';
import MainRoutes from 'Routes/MainRoutes';
import './App.css';
import { useEffect } from 'react';
import { getNotificationList, getUserGroupList, getUserStatusList, setShouldFetchChat } from 'Redux/Slices/ChatSlice';
import { useDispatch } from 'react-redux';

function App() {
 const accessToken=useSelector((state)=>state.auth.token.access);
   const dispatch = useDispatch();
 
useEffect(()=>{
if(!accessToken){

  console.log("before return")
  return;
}
const ws = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/?token=${accessToken}`);
ws.onopen = () => console.log("WebSocket Connected");
ws.onmessage = async (event) => {
  console.log("Notification received event:", event);
  const data = JSON.parse(event.data);
  console.log("Notification received:", data);
  if(data.type==='user_status'){
    await dispatch(getUserStatusList(accessToken));
    await  dispatch(getNotificationList(accessToken))
  }
  if(data.type==='group_create'){
    await dispatch(getUserGroupList(accessToken));
    await  dispatch(getNotificationList(accessToken))
  }
  if(data.type==='chat_message'){
   dispatch(setShouldFetchChat(true))
  }
  
  
}

ws.onclose = () => {
  console.log("WebSocket Disconnected");
};

ws.onerror = (e) => console.error("WebSocket error:", e);

return () => {
      ws.close();
    };
    
},[accessToken])

  return (
    <MainRoutes />
    // <div>f</div>
  )
}

export default App;
