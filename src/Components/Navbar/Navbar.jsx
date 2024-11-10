import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "Redux/Slices/AuthSlice";

export default function Navbar() {
const navigate=useNavigate();
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
        navigate('/dashboard')
      }
    }
function onShelfClick() {
navigate("/shelf");
}
    return (
        <div className="navbar bg-gray-800 px-20">
            <div className="flex-1">
                <Link to="/dashboard" className="btn btn-success-content normal-case text-xl">BookShelf</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 text-white text-xl">
                    { authState.isLoggedIn && <li><p onClick={onShelfClick} className="link">Shelfs</p></li> }
                    { authState.isLoggedIn && <li><p className="link" >{authState.username}</p></li> }
                    <li>
                        <details>
                            <summary className="link" >Options</summary>
                            <ul className="p-2 bg-base-100 text-black text-base z-10">
                                {authState.isLoggedIn && <li><Link to="/signin" onClick={onLogout}>Logout</Link></li>}
                                {!authState.isLoggedIn && <li><Link to="/signup" >Signup</Link></li>}
                                {!authState.isLoggedIn && <li><Link to="/signin" >Signin</Link></li>}

                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
}