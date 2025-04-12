// import ForgotPassword from "Pages/Auth/forgotPassword";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import ForgotPassword from "Pages/Auth/ForgotPassword";
import ResetPassword from "Pages/Auth/ResetPassword";
import Signin from "Pages/Auth/Signin";
import Signup from "Pages/Auth/Signup";
import BookDescription from "Pages/BookDescription";
import Dashboard from "Pages/Dashboard";
import Home from "Pages/Home";
import NotFound from "Pages/NotFound";
import Shelf from "Pages/Shelf";
import ChatArea from "Pages/Chat/ChatArea";
import Group from "Pages/Chat/Group/Group";
import UserStatusList from "Pages/Chat/UserStatusList";

 const MainRoutes=() => {
  console.log('MainRoutes MainRoutes')
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route
        path="/reset-password"
        element={
          <ProtectedRoutes pageName="reset-password">
            <ResetPassword />
           </ProtectedRoutes>
        }
      ></Route>
      <Route path="/book-list" element={<Dashboard />}></Route>
      <Route
        path="/shelf"
        element={
          <ProtectedRoutes pageName="shelf">
            <Shelf />
           </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/book/show/:id"
        element={
           <ProtectedRoutes pageName="book">
            <BookDescription />
           </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/book/edit/:id"
        element={
           <ProtectedRoutes pageName="book">
            <BookDescription />
           </ProtectedRoutes>
        }
      ></Route>
      <Route path="/chat-area" element={<ChatArea />}></Route>
      <Route path="/group" element={<Group />}></Route>
      <Route path="/user-status-list" element={<UserStatusList />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  )
}
export default MainRoutes
