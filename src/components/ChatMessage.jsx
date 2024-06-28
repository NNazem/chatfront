import styles from "./ChatMessage.module.css";

function ChatMessage({ content, senderId, selectedUser }) {
  return (
    <div className={styles.imessage}>
      <p
        className={
          senderId !== selectedUser ? styles["from-me"] : styles["from-them"]
        }
      >
        {content}
      </p>
    </div>
  );
}

export default ChatMessage;
