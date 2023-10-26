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
import AdminPropertyList from './pages/Admin_Propertylist/Admin_propertylist'
import Seller_Dashboard from './pages/Seller_Dashboard/Seller_Dashboard'
import Seller_My_Listing from './pages/Seller_My_Listing/Seller_My_Listing'
import Success from './components/Payment/Success'
import AdminProtected from './protect_public/AdminProtected'
import Reset_Password from './pages/Reset_Password/Reset_Password'
import Chat_Section from './pages/Chat_Section/Chat_Section'
import User_Chat from './pages/User_Chat/User_Chat'



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route Component={Home} path="/" />
        <Route Component={Login} path='/login' />
        <Route Component={Property_Show} path='/property' />
        <Route Component={ForgotPassword} path='/forgot-password' />
        <Route Component={Reset_Password} path='/reset-password/:user/:token' />


        <Route Component={UserProtected}>
          <Route Component={Property_Details} path='/property_details/:id' />
          <Route Component={Userprofile} path='/userprofile' />
          <Route Component={User_Chat} path='/user_chat' />
          <Route Component={Success} path='success=true' />
          <Route Component={Success} path='canceled=true' />
        </Route>

        <Route Component={UserProtected}>
          <Route path='/agent' Component={AgentRoute}>
            <Route Component={Profile} path='profile' />
            <Route Component={Become_a_seller} path='become_a_seller' />
            <Route Component={Create_Listing} path='create_listing' />
            <Route Component={Seller_Dashboard} path='seller_dashboard' />
            <Route Component={Seller_My_Listing} path='seller_mylisting' />
            <Route Component={Chat_Section} path='chat_section' />
          </Route>
          <Route Component={Premium_Page} path='/premium' />
          
        </Route>


        <Route Component={Adminlogin} path='/admin_login' />

        <Route Component={AdminProtected}>
          <Route path='/admin' Component={AdminRoute}>
            <Route Component={AdminDashboard} path='admin_dashboard' />
            <Route Component={Admin_Userlist} path='admin_userlist' />
            <Route Component={AdminBannerList} path='admin_bannerlist' />
            <Route Component={AdminPropertyList} path='admin_propertylist' />
          </Route>
        </Route>  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App