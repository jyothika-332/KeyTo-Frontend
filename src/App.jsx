import React from 'react'
import Home from './pages/Home/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/Forgot-Password/Forgot-password'
import Profile from './pages/Profile/Profile'
import Userprofile from './pages/Userprofile/Userprofile'
import Become_a_seller from './pages/Become_a_Seller/Become_a_seller'
import Adminlogin from './pages/Admin_Login/Adminlogin'
import Admin_Userlist from './pages/Admin_Userlist/Admin_Userlist'
import AgentRoute from './pages/Routes/AgentRoute'
import AdminRoute from './pages/Routes/AdminRoute'
import AdminDashboard from './pages/Admin_Dashboard/AdminDashboard'
import AdminBannerList from './pages/Admin_BannerList/AdminBannerList'
import Create_Listing from './pages/Create_Listing/Create_Listing'
import Premium_Page from './pages/Premium/Premium_Page'
import UserProtected from './protect_public/UserProtected'
import Property_Show from './pages/PropertyShow/Property_Show'
import Property_Details from './pages/Property_Details/Property_Details'



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Login} path='/login' />
        <Route Component={Property_Show} path='/property' />
        <Route Component={UserProtected}>
          <Route Component={Property_Details} path='/property_details' />
          <Route Component={ForgotPassword} path='/forgot-password' />
          <Route Component={Userprofile} path='/userprofile' />
        </Route>

        <Route Component={UserProtected}>
          <Route path='/agent' Component={AgentRoute}>
            <Route Component={Profile} path='profile' />
            <Route Component={Become_a_seller} path='become_a_seller' />
            <Route Component={Create_Listing} path='create_listing' />
          </Route>
          <Route Component={Premium_Page} path='/premium' />
        </Route>


        <Route Component={Adminlogin} path='/admin_login' />

        
        <Route path='/admin' Component={AdminRoute}>
          <Route Component={AdminDashboard} path='admin_dashboard' />
          <Route Component={Admin_Userlist} path='admin_userlist' />
          <Route Component={AdminBannerList} path='admin_bannerlist' />
        </Route>   
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App