import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

function App() {
  const [room, setRoom] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3000', {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
    });

    socket.on('connect_error', (err) => {
      console.error('Connection failed: ', err);
    });

    return () => { if (socket) socket.disconnect(); };
  }, []);

  /*const joinRoom = () => {
    if (socket) {
      socket.emit('join', room);
    }
  };*/

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', { room, msg: message });
      setMessage('');
    }
  };

  return (
    <div>
      <input
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter Room ID"
      />
      <button /*onClick={joinRoom}*/>Join Room</button>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default App;