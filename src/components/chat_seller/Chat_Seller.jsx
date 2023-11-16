import { Avatar, Input } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { BaseUrl, WsURL } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import defaultdp from "../../assets/Image/avatar.png";


function Chat_Page_Seller() {
  const [search, setSearch] = useState("");
  const [recentChats, setRecentChats] = useState({});
  const [clientstate, setClientState] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    getUser();
  }, [search]);
  
  const getUser = () => {
    const token = jwtDecode(localStorage.getItem('token'))
    axios
      .get(`${BaseUrl}/chat/get-seller-recent-chat/${token.id}/`, {
        params: {
          is_seller: false,
          search: search,
        },
      })
      .then((res) => {
        setUserlist(res.data.results);
        });
  };

  const [senderDetails, setSenderDetails] = useState("");
  useEffect(() => {
    getSender();
  }, []);

  const getSender = () => {
    axios
      .get(`${BaseUrl}/user/`, {
        params: {
          id: jwtDecode(localStorage.getItem("token")).user_id,
        },
      })
      .then((res) => {
        console.log(res);
        setSenderDetails(res.data);
      });
  };

  const onButtonClicked = () => {
    if (messageRef.current.value.trim() == "") {
      return;
    }
   
    clientstate.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderDetails.email,
        receiverUsername: recentChats.email,
      })
    );
    messageRef.current.value = "";
  };

  const setUpChat = () => {
    axios
      .get(
        `${BaseUrl}/chat/user-previous-chats/${senderDetails.id}/${recentChats?.id}/`
      )
      .then((response) => {
        if (response.status == 200) {
          setMessages(response.data);
        }
      });

    console.log(
      "ws Url ",
      `${WsURL}/ws/chat/${senderDetails.id}/?${recentChats?.id}`
    );
    const client = new W3CWebSocket(
      `${WsURL}/ws/chat/${senderDetails.id}/?${recentChats?.id}`
      );
    console.log(client);
    setClientState(client);

    client.onopen = (event) => {
      console.log("Websocket disconnected", event);
      };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer);
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            sender_email: dataFromServer.senderUsername,
          },
        ]);
      }
    };

    client.onclose = (event) => {
      console.log("Websocket disconnected", event);

      console.log("Reason:", event.reason);
      console.log("Code:", event.code);
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    if (recentChats.id != undefined) {
      setUpChat();
      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }
    }
  }, [recentChats]);

  return (
    <>
      <div className="grid grid-cols-[20rem,1fr] bg-blue-gray-100">
        <div className="border-2">
          <div className="bg-blue-gray-200 h-14 flex">
            <div>
              <Avatar
                variant="circular"
                size="md"
                alt="tania andrew"
                className="border border-gray-900 p-0.5 mt-1 ml-3"
                src={senderDetails.profile_image ? senderDetails.profile_image : defaultdp}
              />
            </div>
            <div className="mt-5 ml-7">{senderDetails.first_name}</div>
          </div>
          <div className="mt-5 mx-2">
            <div className="w-full flex mx-3">
              <div className="w-2/3">
                <Input
                  placeholder="Search or start new chat"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-full !border !border-gray-500  text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                />{" "}
              </div>
              <div className="w-1/3 p-3 flex justify-end">
                <svg
                  onClick={() => setSearch("")}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div>
              {userlist.map((value, key) => (
                <div
                  className="border-b mt-5 h-12 cursor-pointer"
                  key={key}
                  onClick={() => {
                    setRecentChats({
                      id: value.sender_id,
                      email: value.sender_email ,
                      first_name: value.sender_first_name,
                      profile_image: value.sender_profile,
                    });
                  }}
                >
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="tania andrew"
                    className="border border-gray-900 p-0.5"
                    src={
                      value.sender_profile
                        ? value.sender_profile
                        : defaultdp
                    }
                  />

                  <span className="ml-5">{value.sender_first_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* chat session */}

        {recentChats.id ? (
          <div className="bg-gray-300 flex-col">
            <div className="bg-blue-gray-200 h-14 flex">
              <div>
                <Avatar
                  variant="circular"
                  size="md"
                  alt="tania andrew"
                  className="border border-gray-900 p-0.5 mt-1 ml-8"
                  src={
                    recentChats.profile_image ? recentChats.profile_image : defaultdp
                  }
                />
              </div>
              <div className="mt-5 ml-7">{recentChats.first_name}</div>
            </div>
            <div className="h-[27rem] w-full overflow-auto">
              {messages.map((message, index) =>
                senderDetails.email === message.sender_email ? (
                  <>
                    <div class="flex justify-end mb-2" key={index}>
                      <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                        {message.message}
                      </div>
                      <div className="rounded-full flex justify-center items-center  ms-1 w-7 h-7 ">
                        <img
                          src={
                            senderDetails.profile_image
                              ? senderDetails.profile_image
                              : defaultdp
                          }
                          alt=""
                          className="rounded-full w-5 h-5"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div class="flex mb-2" key={index}>
                      <div className="rounded-full flex justify-center items-center me-1 w-7 h-7 ">
                        <img
                          src={
                            recentChats.profile_image
                              ? recentChats.profile_image
                              : defaultdp
                          }
                          alt=""
                          className="rounded-full w-5 h-5"
                        />
                      </div>
                      <div class="shadow py-1 px-4 rounded-md max-w-xs">
                        {message.message}
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
            <div className="bg-blue-gray-100 flex justify-between p-2 mt-96">
              <div className="w-10">
                <PlusIcon className="h-5 w-5" />
              </div>
              <div className="w-full">
                <Input
                  placeholder="Type a message"
                  variant="outlined"
                  inputRef={messageRef}
                  type="text"
                  className="rounded-full !border !border-gray-600  text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                />{" "}
              </div>
              <div className="w-10" onClick={onButtonClicked}>
                <PaperAirplaneIcon className="h-5 w-5 m-2" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-gray-100 flex h-[52rem] justify-center items-center">
            <p className="font-bold text-xl text-gray-600">Select A Person</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat_Page_Seller;
