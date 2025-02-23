import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({children,pageName}) => {
    const accessList=[] // take from store
    const navigate=useNavigate();

  return (
   accessList?.includes(pageName) ? <div>
      {children}
    </div>:
    navigate('/signin')


  );
};

export default ProtectedRoutes;
