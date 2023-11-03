import React from "react";
import { Avatar } from "@material-tailwind/react";
import Chat_Page_Seller from "../../components/chat_seller/Chat_Seller";

function Chat_Section() {
  return (
    <>
      <div className="me-5 border-2">
        <div className="bg-brown-100">
          <Chat_Page_Seller />
        </div>
      </div>
    </>
  );
}

export default Chat_Section;
