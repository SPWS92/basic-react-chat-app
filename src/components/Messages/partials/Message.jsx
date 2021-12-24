import React from 'react';

const Message = ({ message }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'baseline',
    }}
  >
    <span className="text-slate-500 italic text-xs">
      {`${message.user.name} - ${new Date(message.time).toLocaleTimeString()}`}
    </span>
    <div
      key={message.id}
      className="bg-sky-400 rounded-lg text-left shadow-xl"
      style={{
        minHeight: '40px',
        maxWidth: '90%',
        padding: '15px',
        marginBottom: '15px',
        width: 'fit-content',
      }}
      title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
    >
      <span className="text-lg">{message.value}</span>
    </div>
  </div>
);

export default Message;
