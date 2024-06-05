import { useEffect, useState } from "react";
import ChatContent from "../components/ChatContent";
import ChatNav from "./ChatNav";

import styles from "./ChatTable.module.css";
import { setHandleReceivedMessageCallback } from "../api/websocket";

function ChatTable({ nickName, handleLogout }) {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);

  function handleSelectedUser(user) {
    setSelectedUser(user);
  }

  return (
    <div className={styles["chat-table"]}>
      <ChatNav
        onLogout={handleLogout}
        nickName={nickName}
        onClick={handleSelectedUser}
        users={users}
        setUsers={setUsers}
      />
      <ChatContent
        nickName={nickName}
        selectedUser={selectedUser}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default ChatTable;
