import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const UsersContext = React.createContext()

export function useUsers() {
  return useContext(UsersContext)
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', [])

  function createUser(id, username) {
    setUsers(prevUsers => {
      return [...prevUsers, {id, username}]
    })
  }

  return (
    <UsersContext.Provider value={ {users, createUser} }>
      { children }
    </UsersContext.Provider>
  )
}
