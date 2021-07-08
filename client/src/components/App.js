import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'
import MainInterface from './MainInterface'
import { UsersProvider } from '../contexts/UsersProvider';

function App() {
  const [myUsername, setMyUsername] = useLocalStorage('my-username')
  const [myId, setMyId] = useLocalStorage('my-id')

  const mainInterfacePage = (
    <MainInterface myId={myId} myUsername={myUsername} />
  )

  const loginPage = (
    <Login
      value={myUsername}
      onChange={(value) => setMyUsername(value)}
      // onUsernameSubmit={setUsername}
      onIdSubmit={setMyId}
    />
  )

  return (
    <UsersProvider>
      {myId ? mainInterfacePage : loginPage}
    </UsersProvider>
  )
}

export default App;
