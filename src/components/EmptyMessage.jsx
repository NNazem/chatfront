import styles from "./EmptyMessage.module.css";

function EmptyMessage() {
  return (
    <div>
      <p className={styles.empty}>Please select a chat to start messaging</p>
    </div>
  );
}

export default EmptyMessage;
