import React, { useEffect, useState } from "react";

export default function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes(),
    };
    await socket.emit("message", message);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  console.log("messageList", messageList);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[500px] bg-white relative">
        <div className="w-full h-16 bg-gray-700 flex items-center p-2">
          <div className="size-12 rounded-full bg-white "></div>
        </div>
        <div className="w-full h-[400px] overflow-y-auto ">
          {messageList &&
            messageList.map((msg, i) => (
              <div
                key={i}
                className={`${
                  username === msg.username ? "flex justify-end" : ""
                } `}
              >
                <div
                  className={`${
                    username === msg.username ? "bg-green-600" : "bg-blue-600"
                  } w-2/3 h-16 p-2 text-white m-2 rounded-xl rounded-br-none flex justify-between flex-col`}
                >
                  <div>{msg.message}</div>
                  <div className="w-fll flex justify-end text-xs">
                    {msg.username} - 24.04.2024
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className=" absolute bottom-0 left-0 w-full">
          <input
            className="w-3/4 h-12 border p-3 outline-none"
            type="text"
            placeholder="message send"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-indigo-600 text-white h-12 hover:opacity-75"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
