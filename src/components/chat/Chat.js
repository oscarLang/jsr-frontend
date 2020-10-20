import React from "react";
import "./Display.css";
import Display from "./Display";
import Connect from "./Connect";

import io from 'socket.io-client';
// const socket = io('http://localhost:8300');
const socket = io('https://chat.oscarlang.me');


function Chat() {
    const nick = localStorage.getItem("nick");
    return (
      <div className="centerChat">
          {
              nick !== null && nick !== undefined &&
              (<Display nick={nick} socket={socket}/>)
          }
          {
              nick === null &&
              (<Connect socket={socket}/>)
          }
      </div>
    );
}

export default Chat;
