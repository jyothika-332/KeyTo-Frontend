import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom";


function UserProtected() {
    if (localStorage.getItem('token')) {
        return <Outlet/>
      }
      console.log('You have no account, Please Login');
      return <Navigate to="/"/>
}

export default UserProtected