import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'
import MainInterface from './MainInterface'
// import { ContactsProvider } from '../contexts/ContactsProvider';

function App() {
  const [username, setUsername] = useLocalStorage('username')
  const [id, setId] = useLocalStorage('id')

  const mainInterfacePage = (

      <MainInterface id={id} username={username} />

  )

  const loginPage = (

      <Login
        value={username}
        onChange={(value) => setUsername(value)}
        // onUsernameSubmit={setUsername}
        onIdSubmit={setId}
      />

  )

  return (
    <div>
      {id ? mainInterfacePage : loginPage}

    </div>

  )
}

export default App;

    // {/*<ContactsProvider id={id} username={username}>*/}
      // {/*{id ? mainInterfacePage : loginPage}*/}
