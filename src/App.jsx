import { useSelector } from 'react-redux';
import MainRoutes from 'Routes/MainRoutes';
import './App.css';
import { useEffect } from 'react';
import { getNotificationList, getUserStatusList } from 'Redux/Slices/ChatSlice';
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
  await dispatch(getUserStatusList(accessToken));
  await  dispatch(getNotificationList(accessToken))
  
  // dispatch(receiveNotification(data));
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
