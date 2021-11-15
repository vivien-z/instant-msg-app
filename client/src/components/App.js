import { useState } from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'
import MainInterface from './MainInterface'
import { UsersProvider } from '../contexts/UsersProvider';
import { ChatroomsProvider } from '../contexts/ChatroomsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [myUsername, setMyUsername] = useLocalStorage('my-username')
  const [myId, setMyId] = useLocalStorage('my-id')

  const mainInterfacePage = (
    <MainInterface myId={myId} myUsername={myUsername} />
  )

  const loginPage = (
    <Login
      value={myUsername}
      onChange={(value) => setMyUsername(value)}
      idValue={myId}
      onIdSubmit={setMyId}
      isLoggedIn={isLoggedIn}
      setLogin={setIsLoggedIn}
    />
  )

  return (
    <SocketProvider myId={myId}>
      <UsersProvider>
        <ChatroomsProvider myId={myId} myUsername={myUsername}>
          {isLoggedIn ? mainInterfacePage : loginPage}
        </ChatroomsProvider>
      </UsersProvider>
    </SocketProvider>
  )
}
