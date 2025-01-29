// import ForgotPassword from "Pages/Auth/forgotPassword";
import ForgotPassword from "Pages/Auth/ForgotPassword";
import ResetPassword from "Pages/Auth/ResetPassword";
import Signin from "Pages/Auth/Signin";
import Signup from "Pages/Auth/Signup";
import BookDescription from "Pages/BookDescription";
import Dashboard from "Pages/Dashboard";
import Home from "Pages/Home";
import NotFound from "Pages/NotFound";
import Shelf from "Pages/Shelf";
import { Route, Routes } from "react-router-dom";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/shelf" element={<Shelf />}></Route>
            <Route path="/book/show/:id" element={<BookDescription />}></Route>
            <Route path="/book/edit/:id" element={<BookDescription />}></Route>
            <Route path="*" element={<NotFound />} ></Route>
        </Routes>
    );
}