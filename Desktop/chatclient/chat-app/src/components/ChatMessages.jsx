import { useEffect, useState } from "react";
import styles from "./ChatMessages.module.css";
import {
  findChatMessages,
  setHandleReceivedMessageCallback,
} from "../api/websocket";
import ChatMessage from "./ChatMessage";
import EmptyMessage from "./EmptyMessage";

function ChatMessages({ nickName, selectedUser, messages }) {
  return (
    <>
      {selectedUser && (
        <div className={styles.imessage}>
          {messages.map((message) => (
            <ChatMessage
              content={message.content}
              senderId={message.senderId}
              selectedUser={selectedUser}
            />
          ))}
        </div>
      )}
      {!selectedUser && (
        <div className={styles.empty}>
          <EmptyMessage />
        </div>
      )}
    </>
  );
}

export default ChatMessages;
