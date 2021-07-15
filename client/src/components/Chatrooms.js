import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function Chatrooms({ myId, myUsername }) {
  const { chatrooms, selectChatroomIndex } = useChatrooms()

  function otherRoomUsers(chatroom) {
    return chatroom.roomUsers.filter(user => user.username !== myUsername).map(user => user.username)
  }

  function isMyChatroom(chatroom) {
    return chatroom.roomUsers.length !== otherRoomUsers(chatroom).length
  }

  return (
    <>
      <ListGroup variant="flush">

        {chatrooms.map((chatroom, i) => (
          <ListGroup.Item
            key={i}
            action // bootstrap function make it selectable
            onClick={() => selectChatroomIndex(i)}
            active={chatroom.selected}
          >
            {isMyChatroom(chatroom) ? (otherRoomUsers(chatroom).join(', ') + ', me') : otherRoomUsers(chatroom).join(', ')}

          </ListGroup.Item>
        ))}

      </ListGroup>

    </>
  )
}

// function objectEquality(a, b) {
//   const aProps = Object.getOwnPropertyNames(a);
//   const bProps = Object.getOwnPropertyNames(b);

//   if (aProps.length !== bProps.length) {
//     return false
//   } else {
//     for (let i =0; i < aProps.length; i++) {
//       const propName  = aProps[i]
//       if (a[propName] !== b[propName]) {
//         return false;
//       } else {
//         return true
//       }
//     }
//   }
// }

