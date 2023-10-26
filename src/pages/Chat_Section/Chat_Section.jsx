import React from "react";
import Chat_Contacts from "../../components/chat_contacts/Chat_Contacts";
import Chat_Page from "../../components/chat_section/Chat_Section";
import { Avatar } from "@material-tailwind/react";

function Chat_Section() {
  return (
    <>
      <div className="grid grid-cols-[1fr,1fr] sm:grid-cols-[20rem,1fr] border-2">
        <div className="border-e">
          <div className="bg-blue-gray-200 sm:h-14">
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 ml-3 mt-1"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          </div>
          <Chat_Contacts />
        </div>
        <div className="bg-brown-100">
          <Chat_Page />
        </div>
      </div>
    </>
  );
}

export default Chat_Section;
