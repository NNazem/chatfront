import { over } from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export function connectWebSocket(
  user,
  onConnected,
  onError,
  onMessageReceived
) {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = over(socket);
  console.log("Connecting to the WebSocket server." + user.nickName);
  stompClient.connect({}, () => onConnected(stompClient, user), onError);
}

export function sendMessage(message) {
  if (stompClient) {
    stompClient.send("/app/chat", {}, JSON.stringify(message));
  }
  console.log("Message sent:", message);
}

export function subscribe(destination, callback) {
  if (stompClient) {
    stompClient.subscribe(destination, callback);
  }
}

export async function login(usernameOrEmail, password) {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usernameOrEmail, password }),
  });
  const data = await response.json();
  console.log("Login response:", response.status);
  if (response.status === 200) {
    return data;
  } else {
    throw new Error(data);
  }
}

export function handleConnect(
  user,
  setUser,
  onConnected,
  onError,
  onMessageReceived
) {
  if (user.nickName && user.password) {
    setUser({ ...user, status: "ONLINE" });
    connectWebSocket(user, onConnected, onError, onMessageReceived);
  } else {
    alert("Please enter your nickname and name.");
  }
}

export function onConnected(client, user) {
  subscribe(`/user/${user.nickName}/queue/messages`, onMessageReceived);
  subscribe(`/user/public`, onMessageReceived);
  stompClient.send(
    "/app/user.addUser",
    {},
    JSON.stringify({
      nickName: user.nickName,
      fullName: user.fullName,
      status: "ONLINE",
      password: user.password,
      email: user.email,
    })
  );
}

export function handleDisconnect(user) {
  if (stompClient) {
    stompClient.send(
      "/app/user.disconnectUser",
      {},
      JSON.stringify({
        nickName: user.nickName,
        fullName: user.fullName,
        status: "OFFLINE",
        password: user.password,
        email: user.email,
      })
    );
    stompClient.disconnect();
  }
}

export function onMessageReceived(payload) {
  const message = JSON.parse(payload.body);
  handleReceivedMessage(message);
}

export function onError(error) {
  console.error("Error: ", error);
}

export async function findAndDisplayConversations(nickName) {
  const response = await fetch(
    `http://localhost:8080/searchConversation?nickName=${nickName}`
  );
  const users = await response.json();
  return users;
}

export async function findChatMessages(senderId, recipientId) {
  const response = await fetch(
    `http://localhost:8080/messages/${senderId}/${recipientId}`
  );
  const messages = await response.json();
  return messages;
}

export async function signUpUser(user) {
  const response = await fetch("http://localhost:8080/userSignup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  if (response.status === 200) {
    return data;
  } else {
    throw new Error(data);
  }
}

let handleReceivedMessage = null;

export function setHandleReceivedMessageCallback(callback) {
  handleReceivedMessage = callback;
}

export async function searchUsers(nickname) {
  const response = await fetch(
    `http://localhost:8080/searchUser?nickName=${nickname}`
  );
  const users = await response.json();
  return users;
}
