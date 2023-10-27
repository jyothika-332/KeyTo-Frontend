import { Avatar, Button, Input } from "@material-tailwind/react";
import React from "react";

function Chat_Contacts() {
  return (
    <div>
      <div className="mt-5 mx-2">
        <div className="w-full">
          <Input
            placeholder="Search or start new chat"
            variant="outlined"
            className="rounded-full !border !border-gray-300  text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
          />{" "}
        </div>
        <div>
          <div className="border-b mt-10 h-12">
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <span className="ml-5">kkkk</span>
          </div>
          <div className="border-b mt-5 h-12">
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <span className="ml-5">kkkk</span>
          </div>
          <div className="border-b mt-5 h-12">
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <span className="ml-5">kkkk</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat_Contacts;
