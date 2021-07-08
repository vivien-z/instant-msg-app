import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function Chatrooms() {
  const { chatrooms, selectChatroomIndex } = useChatrooms()

  return (
    <ListGroup variant="flush">

      {chatrooms.map((chatroom, i) => (
        <ListGroup.Item
          key={i}
          action // bootstrap function make it selectable
          onClick={() => selectChatroomIndex(i)}
          active={chatroom.selected}
        >
          {chatroom.roomUsers.map(user => user.username).join(', ')}
        </ListGroup.Item>
      ))}

    </ListGroup>
  )
}
