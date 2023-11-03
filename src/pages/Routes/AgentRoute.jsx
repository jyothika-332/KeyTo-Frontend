import React, { useEffect } from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { SidebarWithContentSeparator } from "../../components/sidebar/Sidebar";
import { FooterWithSocialLinks } from "../../components/footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function AgentRoute() {
  // let navigate = useNavigate()

  // useEffect(() => {
  //   console.log(jwtDecode(localStorage.getItem("token")))
  //   if (localStorage.getItem("token"))
  //   {
  //     if (jwtDecode(localStorage.getItem("token")) != "seller")
  //     {
  //       localStorage.clear()
  //       navigate("/")
  //     }
  //   }
  //   else{
  //     localStorage.clear()
  //       navigate("/")
  //   }
  // }, []);
  
  return (
    <>
      <StickyNavbar />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-20 ">
        <div className="invisible sm:visible">
          <SidebarWithContentSeparator />
        </div>
        <div className="col-span-3 min-h-screen">
          <div className="min-h-screen h-auto">
            <Outlet />
          </div>
          <div className="mt-14">
            <hr className="my-2 border-blue-gray-100 mx-9" />
            <div className="mt-14"><FooterWithSocialLinks /></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentRoute;
