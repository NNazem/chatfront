import React, { useState, useEffect, useCallback } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import ChatContent from "./ChatContent";

var stompClient = null;

function ChatRoom() {
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  function connect() {
    var Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  function onConnected() {
    setUserData(function (prevState) {
      return { ...prevState, connected: true };
    });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onPrivateMessage
    );
    stompClient.subscribe("/topic/connected-users", onConnectedUsersReceived);
    userJoin();
    requestConnectedUsers();
  }

  function requestConnectedUsers() {
    stompClient.send("/app/connected-users", {}, {});
  }

  function onConnectedUsersReceived(payload) {
    var payloadData = JSON.parse(payload.body);
    setConnectedUsers(payloadData);
  }

  function userJoin() {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  function onMessageReceived(payload) {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          setPrivateChats(function (prevChats) {
            var updatedChats = new Map(prevChats);
            updatedChats.set(payloadData.senderName, []);
            return updatedChats;
          });
        }
        break;
      case "MESSAGE":
        setPublicChats(function (prevChats) {
          return [...prevChats, payloadData];
        });
        break;
      default:
        break;
    }
  }

  function onPrivateMessage(payload) {
    var payloadData = JSON.parse(payload.body);
    setPrivateChats(function (prevChats) {
      var updatedChats = new Map(prevChats);
      if (updatedChats.get(payloadData.senderName)) {
        updatedChats.get(payloadData.senderName).push(payloadData);
      } else {
        updatedChats.set(payloadData.senderName, [payloadData]);
      }
      return updatedChats;
    });
  }

  function onError(err) {
    console.error(err);
  }

  function handleMessage(event) {
    var value = event.target.value;
    setUserData(function (prevState) {
      return { ...prevState, message: value };
    });
  }

  function sendValue() {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData(function (prevState) {
        return { ...prevState, message: "" };
      });
    }
  }

  function sendPrivateValue() {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      setPrivateChats(function (prevChats) {
        var updatedChats = new Map(prevChats);
        if (userData.username !== tab) {
          updatedChats.get(tab).push(chatMessage);
        }
        return updatedChats;
      });

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData(function (prevState) {
        return { ...prevState, message: "" };
      });
    }
  }

  function handleUsername(event) {
    var value = event.target.value;
    setUserData(function (prevState) {
      return { ...prevState, username: value };
    });
  }

  function registerUser() {
    connect();
  }

  useEffect(() => {
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => setTab("CHATROOM")}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map(function (name, index) {
                return (
                  <li
                    onClick={() => setTab(name)}
                    className={`member ${tab === name && "active"}`}
                    key={index}
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
          {tab === "CHATROOM" ? (
            <ChatContent
              chats={publicChats}
              userData={userData}
              handleMessage={handleMessage}
              sendValue={sendValue}
            />
          ) : (
            <ChatContent
              chats={privateChats.get(tab)}
              userData={userData}
              handleMessage={handleMessage}
              sendValue={sendPrivateValue}
            />
          )}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
