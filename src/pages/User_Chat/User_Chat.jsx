import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import Chat_Page from "../../components/chat_section/Chat_Section";
import { FooterWithSocialLinks } from "../../components/footer/Footer";


function User_Chat() {
  return (
    <div>
      <div>
        <StickyNavbar />
      </div>
      <div className="mt-8 md:mt-20">
        <div>
          <Chat_Page />
        </div>
      </div>
      <div className="mt-16 md:mt-40">
        <hr className="my-2 border-blue-gray-100 mx-4 md:mx-9" />
        <div className="mt-4 md:mt-10">
          <FooterWithSocialLinks />
        </div>
      </div>
    </div>
  );
}

export default User_Chat;


