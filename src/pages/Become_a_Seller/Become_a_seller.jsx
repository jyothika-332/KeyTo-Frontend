import React, { useEffect } from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { SidebarWithContentSeparator } from "../../components/sidebar/Sidebar";
import Become_A_Selller from "../../components/become_a_seller/Become_A_Selller";
import { FooterWithSocialLinks } from "../../components/footer/Footer";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Become_a_seller() {
  let navigate = useNavigate()

  useEffect(() => {
    console.log (jwtDecode(localStorage.getItem("token")).role)
    if (localStorage.getItem("token"))
    {
      if ( jwtDecode(localStorage.getItem("token")).role === "seller")
      {
        return navigate('/agent/profile')
      }
    }
  }, []);
  return (
    <div>
      <div className="ml-4">
          <div className="text-deep-orange-900 font-serif text-3xl mt-20 ml-10">Add More Personal Info</div>
          <div className="mt-10 ml-10"><Become_A_Selller/></div>
      </div>
    </div>
  );
}

export default Become_a_seller;
