import React, { useEffect, useState } from 'react';
import Message from './partials/Message';
import Divider from './partials/Divider';

const MessageContainer = ({ children, height = '100%' }) => (
  <div
    className="overflow-scroll overscroll-contain flex flex-col-reverse"
    style={{
      height,
      marginLeft: '10px',
      marginRight: '10px',
    }}
  >
    {children}
  </div>
);

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    // Messages are deleted after a certain amount of time (controlled on the server)
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <div style={{ minWidth: '70%', height: '70%' }}>
      <MessageContainer>
        {[...Object.values(messages)]
          .sort((a, b) => b.time - a.time)
          .map((message) => <Message message={message} />)}
      </MessageContainer>
      <Divider />
    </div>
  );
}

export default Messages;
