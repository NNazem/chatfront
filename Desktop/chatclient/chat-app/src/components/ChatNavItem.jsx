import { Children } from "react";
import styles from "./ChatNavItem.module.css";

function ChatNavItem({ nickName, onClick, user, selected, setSelected }) {
  function handleClick(nickName) {
    setSelected(nickName);
    onClick(nickName);
  }
  return (
    <li
      className={`${styles.member} ${
        selected === nickName ? styles.selected : ""
      }`}
      onClick={() => handleClick(nickName)}
    >
      {nickName}
    </li>
  );
}

export default ChatNavItem;
