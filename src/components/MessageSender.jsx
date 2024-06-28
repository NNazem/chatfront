import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import styles from "./MessageSender.module.css";
import { sendMessage } from "../api/websocket";
import useLastMessage from "../hooks/useLastMessage";

function MessageSender({ nickName, selectedUser, setMessages }) {
  const [message, setMessage] = useState("");
  const { refetch } = useLastMessage(selectedUser, nickName);

  function handleSubmit(e) {
    e.preventDefault();
    const chatMessage = {
      senderId: nickName,
      recipientId: selectedUser,
      content: message,
      timestamp: new Date(),
    };
    const response = sendMessage(chatMessage);
    setMessages((prevMessages) => [...prevMessages, chatMessage]);
    setMessage("");
    refetch();
  }
  return (
    <form className={styles["send-message"]} onSubmit={handleSubmit}>
      <Input
        className={"primary"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="primary">Send</Button>
    </form>
  );
}
export default MessageSender;
