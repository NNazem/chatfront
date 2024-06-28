import Button from "../components/Button";
import Input from "../components/Input";

import styles from "./ChatContent.module.css";
import MessageSender from "../components/MessageSender";

function ChatContent({ chats, userData, handleMessage, sendValue }) {
  return (
    <div className={styles["chat-content"]}>
      <ul className="chat-messages">
        {chats.map(function (chat, index) {
          return (
            <li
              className={`message ${
                chat.senderName === userData.username && "self"
              }`}
              key={chat.id || index} // Prefer using a unique id if available
            >
              {chat.senderName !== userData.username && (
                <div className="avatar">{chat.senderName}</div>
              )}
              <div className="message-data">{chat.message}</div>
              {chat.senderName === userData.username && (
                <div className="avatar self">{chat.senderName}</div>
              )}
            </li>
          );
        })}
      </ul>
      <MessageSender>
        <Input
          message={userData.message}
          handleMessage={handleMessage}
          className={"primary"}
        />
        <Button type="primary" onClick={sendValue}>
          Send
        </Button>
      </MessageSender>
    </div>
  );
}

export default ChatContent;
