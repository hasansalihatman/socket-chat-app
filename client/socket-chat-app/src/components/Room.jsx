import React from "react";

export default function Room({
  username,
  setUsername,
  room,
  setRoom,
  setChatScreen,
  socket,
}) {
  function sendRoom() {
    socket.emit("room", room);
    setChatScreen(true);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[350px] rounded-lg bg-indigo-600 flex flex-col space-y-4 p-3">
        <h1 className="text-center my-4 font-bold text-2xl">Welcome to Chat</h1>
        <input
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          onClick={sendRoom}
          className="tracking-wider text-white bg-indigo-900 h-12 pt-2 text-xl text-center rounded-xl hover:opacity-75"
        >
          Chat
        </button>
      </div>
    </div>
  );
}
