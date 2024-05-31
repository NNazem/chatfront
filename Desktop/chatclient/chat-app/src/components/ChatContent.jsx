import MessageSender from "./MessageSender";
import ChatMessages from "./ChatMessages";
import styles from "./ChatContent.module.css";
import {
  findAndDisplayConversations,
  findChatMessages,
  setHandleReceivedMessageCallback,
} from "../api/websocket";
import { useEffect, useState } from "react";

function ChatContent({ nickName, selectedUser, users, setUsers }) {
  const [messages, setMessages] = useState([]);

  async function handleMessages() {
    const data = await findChatMessages(nickName, selectedUser);
    setMessages(data);
  }

  useEffect(() => {
    handleMessages();
  }, [nickName, selectedUser]);

  useEffect(() => {
    setHandleReceivedMessageCallback((message) => {
      if (
        (message.senderId === nickName &&
          message.recipientId === selectedUser) ||
        (message.senderId === selectedUser && message.recipientId === nickName)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      if (
        message.senderId &&
        !users.some((user) => user.nickName === message.senderId)
      ) {
        setUsers((prevUsers) => [...prevUsers, { nickName: message.senderId }]);
      }
    });
  }, [nickName, selectedUser]);

  return (
    <div className={styles["chat-content"]}>
      <ChatMessages
        nickName={nickName}
        selectedUser={selectedUser}
        messages={messages}
      />
      <MessageSender
        nickName={nickName}
        selectedUser={selectedUser}
        setMessages={setMessages}
      />
    </div>
  );
}

export default ChatContent;
