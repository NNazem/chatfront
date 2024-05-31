import styles from "./ChatTabItem.module.css";

function ChatTabItem({ name, username, activeTab, setTab }) {
  return name != username ? (
    <li
      onClick={() => setTab(name)}
      className={`member ${activeTab === name && "active"}`}
    >
      {name}
    </li>
  ) : null;
}

export default ChatTabItem;
