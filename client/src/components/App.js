import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'
import MainInterface from './MainInterface'

function App() {
  const [username, setUsername] = useLocalStorage('username')
  const [id, setId] = useLocalStorage('id')

  // return (
  //   <Login
  //     // value={username}
  //     onUsernameSubmit={setUsername}
  //     onIdSubmit={setId}
  //   />
  // )

  if (id) {
    return (
      <>
        <MainInterface id={id} username={username}/>
      </>
    )
  } else {
    return (
      <>
        <Login
          value={username}
          onChange={(value) => setUsername(value)}
          // onUsernameSubmit={setUsername}
          onIdSubmit={setId}
        />
      </>
    )
  }

}

export default App;
