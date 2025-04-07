import { useSelector } from 'react-redux';
import './App.css';

import MainRoutes from 'Routes/MainRoutes';
import { useEffect } from 'react';

function App() {
 const accessToken=useSelector(state=>state.auth.token.access)
useEffect(()=>{
if(!accessToken){
  return;
}
const ws = new WebSocket(`wss://127.0.0.1:8000/ws/chat/?token=${accessToken}`);
ws.onopen = () => console.log("WebSocket Connected");
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("📨 Notification received:", data);
  // dispatch(receiveNotification(data));
};

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
  );
}

export default App;
