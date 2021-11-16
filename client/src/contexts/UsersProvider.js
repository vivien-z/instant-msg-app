import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const UsersContext = React.createContext()

export function useUsers() {
  return useContext(UsersContext)
}

export function UsersProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', [])

  function getContactUsers(currentUser) {
    return currentUser.contacts.map(contact => (
      users.find(user => user.id === contact.id)
    ))
  }

  function getNonContactUsers(currentUser) {
    const myContacts = getContactUsers(currentUser)
    const nonContacts = users.filter(user => (
      user.username !== currentUser.username && !myContacts.includes(user)
    ))
    return nonContacts
  }


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

  const outputValue = {
    users,
    createUser,
    addContact,
    getNonContactUsers,
    getContactUsers
  }

  return (
    <UsersContext.Provider value={ outputValue }>
      { children }
    </UsersContext.Provider>
  )
}
