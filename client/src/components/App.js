import React, { useState } from 'react'
import Login from './Login'

function App() {
  const [username, setUsername] = useState('')

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
