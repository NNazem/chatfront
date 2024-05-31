import React, { useState } from "react";
import {
  handleConnect,
  handleDisconnect,
  login,
  onConnected,
  onError,
  onMessageReceived,
} from "../api/websocket";
import styles from "./Chat.module.css";
import ChatTable from "./ChatTable";
import Login from "./Login";
import Signup from "./Signup";

function Chat() {
  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState({
    nickName: "",
    fullName: "",
    password: "",
    email: "",
    status: "",
  });

  async function connectHandler(event) {
    event.preventDefault();
    try {
      if (user.nickName) {
        await login(user.nickName, user.password);
      }
      handleConnect(user, setUser, onConnected, onError, onMessageReceived);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleSignup() {
    setSignup((prev) => !prev);
  }

  function handleLogout() {
    handleDisconnect(user);
    setUser({
      nickName: "",
      fullName: "",
      password: "",
      email: "",
      status: "",
    });
  }

  return (
    <div className={styles.chat}>
      {!user.status && !signup && (
        <Login
          user={user}
          setUser={setUser}
          handleConnect={connectHandler}
          handleSignup={handleSignup}
        />
      )}

      {!user.status && signup && (
        <Signup
          setSignup={setSignup}
          handleSignup={handleSignup}
          user={user}
          setUser={setUser}
        />
      )}

      {user.status === "ONLINE" && (
        <ChatTable nickName={user.nickName} handle onLogout={handleLogout} />
      )}
    </div>
  );
}

export default Chat;
