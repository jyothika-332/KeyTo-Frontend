import { Outlet,Navigate } from "react-router-dom"


function AdminProtected() {
    if (localStorage.getItem('token')) {
        return <Outlet/>
      }
      console.error('You have no account, Please Login');
      return <Navigate to="/admin_login"/>
}

export default AdminProtected