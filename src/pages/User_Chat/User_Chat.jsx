import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import Chat_Contacts from "../../components/chat_contacts/Chat_Contacts";
import Chat_Page from "../../components/chat_section/Chat_Section";
import { FooterWithSocialLinks } from "../../components/footer/Footer";
import { Avatar } from "@material-tailwind/react";

function User_Chat() {
  return (
    <div>
      <div>
        <StickyNavbar />
      </div>
      <div className="mt-20">
        {/* <div className="border-2">
          <div className="bg-blue-gray-200 h-14">
            <Avatar
              variant="circular"
              size="md"
              alt="tania andrew"
              className="border border-gray-900 p-0.5 mt-1 ml-3"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          </div>
          <div>
            <Chat_Contacts />
          </div>
        </div> */}
        <div>
          <Chat_Page />
        </div>
      </div>
      <div className="mt-40">
        <hr className="my-2 border-blue-gray-100 mx-9" />
        <div className="mt-10">
          <FooterWithSocialLinks />
        </div>
      </div>
    </div>
  );
}

export default User_Chat;


// grid grid-cols-[20rem,1fr]