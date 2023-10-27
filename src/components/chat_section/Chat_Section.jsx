import { Avatar, Input } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { BaseUrl, WsURL } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import defaultdp from "../../assets/Image/avatar.png";

function Chat_Page() {
  const [search, setSearch] = useState("");

  const [sellerlist, setSellerlist] = useState([]);
  useEffect(() => {
    getSeller();
  }, [search]);

  const getSeller = () => {
    axios
      .get(`${BaseUrl}/user/`, {
        params: {
          is_seller: true,
          search: search,
        },
      })
      .then((res) => {
        console.log(res);
        setSellerlist(res.data);
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

  const [recentChats, setRecentChats] = useState({});
  const [clientstate, setClientState] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();

  const onButtonClicked = () => {
    if (messageRef.current.value.trim() == "") {
      return;
    }
    clientstate.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderDetails.email,
        receiverUsername: sellerlist.email,
      })
    );
    messageRef.current.value = "";
  };

  const setUpChat = () => {
    axios
      .get(`chat/user-previous-chats/${senderDetails.id}/${sellerlist.id}/`)
      .then((response) => {
        if (response.status == 200) {
          setMessages(response.data);
        }
      });
    const client = new W3CWebSocket(
      `${WsURL}/ws/chat/${senderDetails.id}/?${sellerlist.id}`
    );
    setClientState(client);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer, "daxooo");
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

    client.onclose = () => {
      console.log("Websocket disconnected", event.reason);
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    if (senderDetails.id != null && sellerlist.id != null) {
      setUpChat();
    }
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [senderDetails, sellerlist]);

  return (
    <>
      <div className="grid grid-cols-[20rem,1fr]">
        <div className="border-2">
          <div className="bg-blue-gray-200 h-14 flex">
            <div>
              <Avatar
                variant="circular"
                size="md"
                alt="tania andrew"
                className="border border-gray-900 p-0.5 mt-1 ml-3"
                src={`${BaseUrl}${senderDetails.profile_image}`}
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
                  className="rounded-full !border !border-gray-300  text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
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
                  className="w-5 h-5 text-gray-400"
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
              {sellerlist.map((value, key) => (
                <div className="border-b mt-5 h-12">
                  <Avatar
                    variant="circular"
                    size="sm"
                    alt="tania andrew"
                    className="border border-gray-900 p-0.5"
                    src={`${BaseUrl}${value.profile_image}`}
                  />
                  <span className="ml-5" onClick={() => setRecentChats()}>{value.first_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* chat session */}

        {sellerlist.email ? (
          <div className="bg-gray-300  flex-col">
            <div className="bg-blue-gray-200 h-14 flex">
              <div>
                <Avatar
                  variant="circular"
                  size="md"
                  alt="tania andrew"
                  className="border border-gray-900 p-0.5 mt-1 ml-8"
                  src={
                    sellerlist.profile_image
                      ? sellerlist.profile_image
                      : defaultdp
                  }
                />
              </div>
              <div className="mt-5 ml-7">{sellerlist.first_name}</div>
            </div>
            <div className="h-[27rem] overflow-auto">
              {messages.map((message, index) =>
                senderDetails.email === message.sender_email ? (
                  <>
                    <div class="flex justify-end mb-2" key={index}>
                      <div class="bg-purple-50 shadow border text-gray-800 py-1 px-4 rounded-md max-w-xs">
                        {message.message}
                      </div>
                      <div className="rounded-full flex justify-center items-center -me-3 ms-1 w-7 h-7 ">
                        <img
                          src={
                            senderDetails.profile_image
                              ? senderDetails.profile_image
                              : defaultprofile
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
                      <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-7 h-7 ">
                        <img
                          src={
                            sellerlist.profile_image
                              ? sellerlist.profile_image
                              : defaultprofile
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
            <div className="bg-blue-gray-100 flex justify-between items-center p-2">
              <div className="w-10">
                <PlusIcon className="h-5 w-5" />
              </div>
              <div className="w-full">
                <Input
                  placeholder="Type a message"
                  variant="outlined"
                  ref={messageRef}
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

export default Chat_Page;
