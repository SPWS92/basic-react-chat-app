import React, { useState, useEffect } from 'react';
// import './App.css';
import io from 'socket.io-client';
import { MessageInput, Messages } from './components';

export default function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div
      className="flex flex-col"
    >
      <header className="flex justify-center">
        React Chat Application
      </header>
      { socket ? (
        <div
          className="h-screen"
          style={{
            width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column',
          }}
        >
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}
