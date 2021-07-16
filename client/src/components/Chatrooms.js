import React, { useState } from 'react'
import { ListGroup, Modal } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';
import JoinChatroomModal from './JoinChatroomModal'

export default function Chatrooms({ myId, myUsername }) {
  const { chatrooms, selectChatroomIndex } = useChatrooms()
  const [modalOpen, setModalOpen] = useState(false)

  function otherRoomUsers(chatroom) {
    return chatroom.roomUsers.filter(user => user.username !== myUsername).map(user => user.username)
  }

  function isMyChatroom(chatroom) {
    return chatroom.roomUsers.length !== otherRoomUsers(chatroom).length
  }

  function listChatroomUsers(chatroom) {
    if (isMyChatroom(chatroom)) {
      return otherRoomUsers(chatroom).join(', ') + ', me'
    } else {
      return otherRoomUsers(chatroom).join(', ')
    }
  }

  function openModal(chatroom) {
      console.log('modalOpen')
    if (!isMyChatroom(chatroom)) {
      setModalOpen(true)
    }
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <>
      <ListGroup variant="flush">

        {chatrooms.map((chatroom, i) => (
          <ListGroup.Item
            key={i}
            action // bootstrap function make it selectable
            onClick={() => selectChatroomIndex(i) && openModal(chatroom)}
            active={chatroom.selected}
          >
            {listChatroomUsers(chatroom)}


          </ListGroup.Item>
        ))}

      </ListGroup>
      <Modal show={modalOpen} onHide={closeModal}>

          <JoinChatroomModal closeModal={closeModal} myId={myId} myUsername={myUsername} chatroom={chatroom}/>

      </Modal>
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

