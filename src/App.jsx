import { useSelector } from 'react-redux';
import MainRoutes from 'Routes/MainRoutes';
import './App.css';

import { useEffect } from 'react';

function App() {
 const accessToken=useSelector(state=>state.auth.token.access)
useEffect(()=>{
if(!accessToken){

  console.log("before return")
  return;
}
const ws = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/?token=${accessToken}`);
ws.onopen = () => console.log("WebSocket Connected");
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("📨 Notification received:", data);
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
