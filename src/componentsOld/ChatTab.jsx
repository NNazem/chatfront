import ChatTabItem from "./ChatTabItem";

function ChatTab({ tab, setTab, privateChats, username }) {
  return (
    <ul>
      <ChatTabItem name="CHATROOM" activeTab={tab} setTab={setTab} />
      {[...privateChats.keys()].map((name, index) => (
        <ChatTabItem
          key={index}
          name={name}
          username={username}
          activeTab={tab}
          setTab={setTab}
        />
      ))}
    </ul>
  );
}

export default ChatTab;
