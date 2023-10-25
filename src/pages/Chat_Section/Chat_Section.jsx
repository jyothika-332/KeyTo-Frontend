import React from "react";
import Chat_Contacts from "../../components/chat_contacts/Chat_Contacts";
import Chat_Page from "../../components/chat_section/Chat_Section";

function Chat_Section() {
  return (
    <>
      <div className="grid grid-cols-[20rem,1fr]  border-2">
        <div className="border-e">
          <div className="bg-blue-gray-200 h-14">kkk</div>
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
