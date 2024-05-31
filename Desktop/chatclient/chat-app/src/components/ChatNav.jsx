import styles from "./ChatNav.module.css";
import ChatNavItem from "./ChatNavItem";
import {
  findAndDisplayConversations,
  searchUsers,
  setHandleReceivedMessageCallback,
} from "../api/websocket";
import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";

function ChatNav({ nickName, onClick, onLogout, users, setUsers }) {
  const [selected, setSelected] = useState("Anton");

  async function handleUserList() {
    const data = await findAndDisplayConversations(nickName);
    setUsers(data);
  }

  async function handleUserSearch(event) {
    const data = await searchUsers(event.target.value);
    setUsers(data);
  }

  useEffect(() => {
    handleUserList();
  }, []);

  useEffect(() => {
    setHandleReceivedMessageCallback((message) => {
      console.log("Received message", message);
      console.log("Users", users);
      if (!users.some((user) => user.nickName === message.senderId)) {
        console.log("New user added to the list");
        handleUserList();
      }
    });
  }, []);
  return (
    <div className={styles["chat-nav"]}>
      <Input
        className={"search"}
        placeholder="Search"
        onChange={handleUserSearch}
      />
      <div className={styles["userAndButtons"]}>
        <ul className={styles["chat-container"]}>
          {users.map(
            (user) =>
              nickName !== user.nickName && (
                <ChatNavItem
                  onClick={onClick}
                  selected={selected}
                  setSelected={setSelected}
                  nickName={user.nickName}
                  key={user.nickName}
                />
              )
          )}
        </ul>
        <Button type="Logout" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ChatNav;
