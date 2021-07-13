import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function Chatrooms({ myUsername }) {
  const { chatrooms, selectChatroomIndex } = useChatrooms()

  function otherRoomUsers(chatroom) {
    return chatroom.roomUsers.filter(user => user.username !== myUsername)
  }

  return (
    <ListGroup variant="flush">

      {chatrooms.map((chatroom, i) => (
        <ListGroup.Item
          key={i}
          action // bootstrap function make it selectable
          onClick={() => selectChatroomIndex(i)}
          active={chatroom.selected}
        >
          {otherRoomUsers(chatroom).map(user => user.username).join(', ')}
        </ListGroup.Item>
      ))}

    </ListGroup>
  )
}
