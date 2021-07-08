import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function Chatrooms() {
  const { chatrooms } = useChatrooms()

  return (
    <ListGroup variant="flush">

      {chatrooms.map((chatroom, i) => (
        <ListGroup.Item key={i}>
          {chatroom.roomUsers.map(user => user.username).join(', ')}
        </ListGroup.Item>
      ))}

    </ListGroup>
  )
}
