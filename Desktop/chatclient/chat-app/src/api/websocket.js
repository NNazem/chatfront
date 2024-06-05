import { over } from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

const BASE_URL = "http://localhost:8080";

async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  requireAuth = true
) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.indexOf("application/json") !== -1) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (response.status >= 200 && response.status < 300) {
    return data;
  } else {
    throw new Error(data);
  }
}

export async function login(usernameOrEmail, password) {
  const data = await apiRequest(
    "/auth/login",
    "POST",
    { usernameOrEmail, password },
    false
  );
  localStorage.setItem("token", data.token);
  localStorage.setItem("tokenExpiration", data.expiresIn);
  return data;
}

export async function signUpUser(user) {
  return await apiRequest("/auth/signup", "POST", user, false);
}

export async function fetchUserInfo() {
  return await apiRequest("/me", "GET");
}

export async function findAndDisplayConversations(nickName) {
  return await apiRequest(`/searchConversation?nickName=${nickName}`, "GET");
}

export async function findChatMessages(senderId, recipientId) {
  return await apiRequest(`/messages/${senderId}/${recipientId}`, "GET");
}

export async function searchUsers(nickname) {
  return await apiRequest(`/searchUser?nickName=${nickname}`, "GET");
}

export function connectWebSocket(
  user,
  onConnected,
  onError,
  onMessageReceived
) {
  const token = localStorage.getItem("token");
  const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
  stompClient = over(socket);
  console.log("Connecting to the WebSocket server. " + user.nickName);

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

let handleReceivedMessage = null;

export function setHandleReceivedMessageCallback(callback) {
  handleReceivedMessage = callback;
}
