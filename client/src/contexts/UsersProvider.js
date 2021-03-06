import React, { useContext, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useSocket } from '../contexts/SocketProvider';

const UsersContext = React.createContext()

export function useUsers() {
  return useContext(UsersContext)
}

export function UsersProvider({ myId, myUsername, children }) {
  const [users, setUsers] = useLocalStorage('users', [])
  const socket = useSocket()

  function getContactUsers(currentUser) {
    return currentUser.contacts.map(contact => (
      users.find(user => user.username === contact.username)
    ))
  }

  function getNonContactUsers(currentUser) {
    const myContacts = getContactUsers(currentUser)
    const nonContacts = users.filter(user => (
      user.username !== currentUser.username && !myContacts.includes(user)
    ))
    return nonContacts
  }

  const addNewUser = useCallback(({id, username}) => {
    setUsers(prevUsers => {
      return [...prevUsers, {id, username, contacts: []}]
    })
  },[setUsers])

  function createUser({id, username}) {
    addNewUser({id: id, username: username})
    socket.emit('add-new-user', {id, username})
  }

  function addContact({user, newContact}) {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(u => {
        if (u.id === user.id) {
          u.contacts.push({username: newContact})
        }
        return u
      })
      return updatedUsers
    })
  }

  useEffect(() => {
    if (socket === null) return
    socket.on('new-user-created',addNewUser)
    return () => socket.off('new-user-created')
  }, [socket, addNewUser])

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
