import MessageSender from "./MessageSender";
import ChatMessages from "./ChatMessages";
import styles from "./ChatContent.module.css";
import {
  findAndDisplayConversations,
  findChatMessages,
  setHandleReceivedMessageCallback,
} from "../api/websocket";
import { useEffect, useState } from "react";
import useLastMessage from "../hooks/useLastMessage";

function ChatContent({ nickName, selectedUser, users, setUsers }) {
  const [messages, setMessages] = useState([]);
  const { lastMessage, isLoading, refetch, setLastMessage } = useLastMessage(
    selectedUser,
    nickName
  );

  async function handleMessages() {
    const data = await findChatMessages(nickName, selectedUser);
    console.log(data);
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
        setMessages((prevMessages) => {
          if (!prevMessages.some((msg) => msg.id === message.id)) {
            refetch();
            return [...prevMessages, message];
          }
          return prevMessages;
        });
      }
      const isNewUser = message.senderId && !users.includes(message.senderId);
      if (isNewUser) {
        setUsers((prevUsers) => [...prevUsers, message.senderId]);
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
