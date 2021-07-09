import React, { useContext, useState, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useUsers } from '../contexts/UsersProvider';

const ChatroomsContext = React.createContext()

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ myId, myUsername, children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0)
  const { users } = useUsers()

  function createChatroom(roomUserIds) {
    setChatrooms(prevChatrooms => {
      return [...prevChatrooms, { roomUserIds: roomUserIds, messages: [] }]
    })
  }

  const addMessageToChatroom = useCallback(({ selectedChatroom, msgText, sender }) => {

    // const recipients = selectedChatroom.roomUsers.filter(user => user.id !== sender.id)

    setChatrooms(prevChatrooms => {
      const newMessage = { sender, msgText }

      const updatedChatrooms = prevChatrooms.map(chatroom => {
        if (chatroom === selectedChatroom) {
          return {
            ...chatroom,
            messages: [...chatroom.messages, newMessage]
          }
        } else {
          return chatroom
        }
      })
      return updatedChatrooms
    })
  }, [setChatrooms])

  function sendMessage(selectedChatroom, msgText) {
    const sender = selectedChatroom.roomUsers.filter(user => user.id === myId)
    addMessageToChatroom({ selectedChatroom, msgText, sender })
  }

  const formattedChatrooms = chatrooms.map((chatroom, i) => {

    const roomUsers = chatroom.roomUserIds.map(rmUserId => {
      const roomUser = users.find(user => {
        return user.id === rmUserId
      })
      const username = (roomUser && roomUser.username) || rmUserId
      return { id: rmUserId, username: username }
    })

    const messages = chatroom.messages.map(msg => {
      const msgSender = users.find(user => {
        return user.id === msg.sender.id
      })
      const senderName = (msgSender && msgSender.username) || msgSender.id
      const fromMe = myId === msg.sender.id
      return { ...msg, senderName: senderName, fromMe }
    })

    const selected = i === selectedChatroomIndex

    return { ...chatroom, roomUsers, messages, selected }
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
