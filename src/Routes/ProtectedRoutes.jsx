
const ProtectedRoutes = ({children,pageName}) => {
    const accessList=[] // take from store

  return (
   accessList?.includes(pageName) ? <div>
      {children}
    </div>:
<div>
Please Login to access this page
</div>

  )
}

export default ProtectedRoutes;
