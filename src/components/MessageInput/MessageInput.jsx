/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';

const NewMessage = ({ socket }) => {
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', value);
    setValue('');
  };

  return (
    <form
      onSubmit={submitForm}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        height: '200px',
      }}
    >
      <textarea
        autoFocus
        value={value}
        className="border border-2 border-slate-200 focus:border-sky-400 rounded-lg shadow-xl "
        placeholder="Please type your message"
        style={{
          width: '80%',
          alignSelf: 'center',
          margin: '10px 0px',
          height: '100%',
          padding: '10px',
        }}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <input
        style={{
          width: 'fit-content',
          padding: '5px 20px',
        }}
        className="hover:bg-blue-700 bg-blue-900 rounded-md text-white cursor-pointer"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default NewMessage;
