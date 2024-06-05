import React, { useEffect, useState } from "react";
import {
  handleConnect,
  handleDisconnect,
  login,
  onConnected,
  onError,
  onMessageReceived,
  fetchUserInfo,
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
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tokenExpiry, setTokenExpiry] = useState(
    localStorage.getItem("tokenExpiry") || ""
  );

  useEffect(() => {
    if (token && tokenExpiry) {
      const expiryDate = new Date(parseInt(tokenExpiry, 10));
      if (expiryDate > new Date()) {
        // Token is valid
        fetchUserInfo()
          .then((userInfo) => {
            setUser({
              ...userInfo,
              status: "ONLINE",
            });
            handleConnect(
              userInfo,
              setUser,
              onConnected,
              onError,
              onMessageReceived
            );
          })
          .catch((error) => {
            console.error("Failed to fetch user info:", error);
            handleLogout();
          });
      } else {
        // Token is expired
        handleLogout();
      }
    }
  }, [token, tokenExpiry]);

  async function connectHandler(event) {
    event.preventDefault();
    try {
      if (!token && user.nickName && user.password) {
        const data = await login(user.nickName, user.password);
        const expiryTime = Date.now() + data.expiresIn;
        localStorage.setItem("token", data.token);
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        setToken(data.token);
        setTokenExpiry(expiryTime.toString());

        const userInfo = await fetchUserInfo();
        setUser({
          ...userInfo,
          status: "ONLINE",
        });

        handleConnect(
          { ...userInfo, token: data.token },
          setUser,
          onConnected,
          onError,
          onMessageReceived
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleSignup() {
    setSignup((prev) => !prev);
  }

  function handleLogout() {
    console.log("Logging out");
    handleDisconnect(user);
    setUser({
      nickName: "",
      fullName: "",
      password: "",
      email: "",
      status: "",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setToken("");
    setTokenExpiry("");
  }

  return (
    <div className={styles.chat}>
      {!user.status && !signup && !token && (
        <Login
          user={user}
          setUser={setUser}
          handleConnect={connectHandler}
          handleSignup={handleSignup}
        />
      )}

      {!user.status && signup && !token && (
        <Signup
          setSignup={setSignup}
          handleSignup={handleSignup}
          user={user}
          setUser={setUser}
        />
      )}

      {user.status === "ONLINE" && token && (
        <ChatTable nickName={user.nickName} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default Chat;
