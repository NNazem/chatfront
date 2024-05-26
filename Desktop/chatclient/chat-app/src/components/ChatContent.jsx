function ChatContent({ chats, userData, handleMessage, sendValue }) {
  return (
    <div className="chat-content">
      <ul className="chat-messages">
        {chats.map(function (chat, index) {
          return (
            <li
              className={`message ${
                chat.senderName === userData.username && "self"
              }`}
              key={index}
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
      <div className="send-message">
        <input
          type="text"
          className="input-message"
          placeholder="enter the message"
          value={userData.message}
          onChange={handleMessage}
        />
        <button type="button" className="send-button" onClick={sendValue}>
          send
        </button>
      </div>
    </div>
  );
}

export default ChatContent;
