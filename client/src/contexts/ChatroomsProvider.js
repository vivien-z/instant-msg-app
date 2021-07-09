import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useUsers } from '../contexts/UsersProvider';

const ChatroomsContext = React.createContext()

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ myId, children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0)
  const { users } = useUsers()

  function createChatroom(selectedUserIds) {
    setChatrooms(prevChatrooms => {
      return [...prevChatrooms, { roomUsers: selectedUserIds, messages: [] }]
    })
  }

  function addMessageToChatroom({ recipients, message, sender }) {

  }

  function sendMessage(recipients, message) {
    addMessageToChatroom({ recipients, message, sender: myId })
  }

  const formattedChatrooms = chatrooms.map((chatroom, i) => {

    const roomUsers = chatroom.roomUsers.map(selectedUserId => {
      const roomUser = users.find(user => {
        return user.id === selectedUserId
      })
      const username = (roomUser && roomUser.username) || selectedUserId
      return { id: selectedUserId, username: username }
    })
    const selected = i === selectedChatroomIndex
    return { ...chatroom, roomUsers, selected }
  })

  const outputValue = {
    chatrooms: formattedChatrooms,
    selectedChatroom: formattedChatrooms[selectedChatroomIndex],
    selectChatroomIndex: setSelectedChatroomIndex,
    createChatroom,
    sendMessage
  }

  return (
    <ChatroomsContext.Provider value={ outputValue }>
      { children }
    </ChatroomsContext.Provider>
  )
}
