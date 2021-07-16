import React, { useContext, useState, useCallback, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useUsers } from '../contexts/UsersProvider';
import { useSocket } from '../contexts/SocketProvider';

const ChatroomsContext = React.createContext()

export function useChatrooms() {
  return useContext(ChatroomsContext)
}

export function ChatroomsProvider({ myId, myUsername, children }) {
  const [chatrooms, setChatrooms] = useLocalStorage('chatrooms', [])
  const [selectedChatroomIndex, setSelectedChatroomIndex] = useState(0)
  const { users } = useUsers()
  const socket = useSocket()

  function createChatroom(roomUserIds) {
    setChatrooms(prevChatrooms => {
      return [...prevChatrooms, { roomUsers: roomUserIds, messages: [] }]
    })
  }

  function addUserToChatroom(newUserId, selectedChatroom) {
    setChatrooms(prevChatrooms => {
      const updatedChatrooms = chatrooms.map(chatroom => {
        const chatroomUserIds = chatroom.roomUsers
        const selectedChatroomUserIds = selectedChatroom.roomUsers.map(user => user.id)
        if (arrayEquality(chatroomUserIds,selectedChatroomUserIds)) {
          return {
            ...chatroom,
            roomUsers: [...selectedChatroomUserIds, newUserId],
          }
        } else {
          return chatroom
        }
      })
      return updatedChatrooms
    })
  }

  const addMessageToChatroom = useCallback(({ selectedChatroom, sender, msgText }) => {
    setChatrooms(prevChatrooms => {
      const newMessage = { sender, msgText }
      const newUser = !selectedChatroom.roomUsers.find(user => user.id === sender.id)

      const updatedChatrooms = prevChatrooms.map(chatroom => {
        const chatroomUserIds = chatroom.roomUsers
        const selectedChatroomUserIds = selectedChatroom.roomUsers.map(user => user.id)

        if (arrayEquality(chatroomUserIds,selectedChatroomUserIds)) {
          if (newUser) {
            return {
              ...chatroom,
              roomUsers: [...selectedChatroomUserIds, sender.id],
              messages: [...chatroom.messages, newMessage]
            }
          } else {
            return {
              ...chatroom,
              messages: [...chatroom.messages, newMessage]
            }
          }
        } else {
          return chatroom
        }
      })
      return updatedChatrooms
    })
  }, [setChatrooms])

  useEffect(() => {
    if (socket === null) return
    socket.on('receive-message',addMessageToChatroom)
    return () => socket.off('receive-message')
  }, [socket, addMessageToChatroom])

  function sendMessage(selectedChatroom, msgText) {
    const sender = selectedChatroom.roomUsers.find(user => user.id === myId) || users.find(user => user.id === myId)
    const roomUsers = selectedChatroom.roomUsers

    socket.emit('send-message', { selectedChatroom, sender, msgText, roomUsers })
    addMessageToChatroom({ selectedChatroom, msgText, sender })
  }

  const formattedChatrooms = chatrooms.map((chatroom, i) => {

    const roomUsers = chatroom.roomUsers.map(rmUserId => {
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
    sendMessage,
    addUserToChatroom
  }

  return (
    <ChatroomsContext.Provider value={ outputValue }>
      { children }
    </ChatroomsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) {
    return false
  } else {
    a.sort()
    b.sort()

    return a.every((e, i) => {
      return e === b[i]
    })
  }
}
