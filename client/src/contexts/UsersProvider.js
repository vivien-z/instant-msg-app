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
      return [...prevUsers, {id, username, contacts: []}]
    })
  }

  function addContact({user, newContactId}) {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(u => {
        if (u.id === user.id) {
          u.contacts.push({id: newContactId})
        }
        return u
      })
      return updatedUsers
    })
  }

  return (
    <UsersContext.Provider value={ {users, createUser, addContact} }>
      { children }
    </UsersContext.Provider>
  )
}
