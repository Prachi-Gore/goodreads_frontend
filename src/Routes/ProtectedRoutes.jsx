import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AUTH_ACCESS from "Constants/constant";

const ProtectedRoutes = ({ children, pageName }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const accessList = useSelector(state => state.auth.isLoggedIn)?AUTH_ACCESS:[];
    const navigate = useNavigate();
console.log("access list ",accessList)
    useEffect(() => {
        if (!accessList?.includes(pageName)) {
            navigate('/signin'); //  Redirect runs after render
        }
    }, [accessList, pageName, navigate]);

    if (!accessList?.includes(pageName)) {
        return null; // Prevent rendering children while redirecting
    }

    return <>{children}</>; // ✅ Only render children if access is allowed
};

export default ProtectedRoutes;
