import { Outlet,Navigate } from "react-router-dom"


function UserProtected() {
    if (localStorage.getItem('token')) {
        return <Outlet/>
      }
      console.error('You have no account, Please Login');
      return <Navigate to="/"/>
}

export default UserProtected