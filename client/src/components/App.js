import React, { useState } from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [username, setUsername] = useLocalStorage('username')

  return (
    <>
      {username}
      <Login
        // value={username}
        // onChange={(value) => setUsername(value)}
        onUsernameSubmit={setUsername}
      />
    </>
  );
}

export default App;
