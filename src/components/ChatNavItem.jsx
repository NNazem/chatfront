import { Children } from "react";
import styles from "./ChatNavItem.module.css";
import Logo from "./Logo";
import useLastMessage from "../hooks/useLastMessage";

function ChatNavItem({
  nickName,
  onClick,
  user,
  selected,
  setSelected,
  fetchLastMessage,
}) {
  const { lastMessage, isLoading, refetch, setLastMessage } = useLastMessage(
    nickName,
    user
  );
  function handleClick(nickName) {
    console.log("Selected", nickName);
    setSelected(nickName);
    onClick(nickName);
    refetch();
  }

  return (
    <li
      className={`${styles.member} ${
        selected === nickName ? styles.selected : ""
      }`}
      onClick={() => handleClick(nickName)}
    >
      <Logo nickName={nickName} />
      <div>
        {nickName}
        <p>{lastMessage}</p>
      </div>
    </li>
  );
}

export default ChatNavItem;
