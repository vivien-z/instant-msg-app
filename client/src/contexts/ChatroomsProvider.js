import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useUsers } from '../contexts/UsersProvider';

const ChatroomsContext = React.createContext()

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const { users } = useUsers()

  function createChatroom(selectedUserIds) {
    setChatrooms(prevChatrooms => {
      return [...prevChatrooms, { roomUsers: selectedUserIds, messages: [] }]
    })
  }

  const formattedChatrooms = chatrooms.map(chatroom => {

    const roomUsers = chatroom.roomUsers.map(selectedId => {
      const roomUser = users.find(user => {
        return user.id === selectedId
      })
      const username = (roomUser && roomUser.username) || selectedId
      return { id: selectedId, username: username }
    })

    return { ...chatroom, roomUsers }
  })

  const outputValue = {
    chatrooms: formattedChatrooms,
    createChatroom
  }

  return (
    <ChatroomsContext.Provider value={ outputValue }>
      { children }
    </ChatroomsContext.Provider>
  )
}
