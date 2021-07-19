import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider';
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function NewChatroomModal({ closeModal, myId, myUsername }) {
  const { users } = useUsers()
  const contacts = users.filter(user => {
    return user.username !== myUsername
  })
  const { createChatroom } = useChatrooms()
  const [selectedUserIds, setSelectedUserIds] = useState([])

  function handleCheckboxChange(checkedId) {
    setSelectedUserIds(prevSelectedUserIds => {
      if (prevSelectedUserIds.includes(checkedId)) {
        return prevSelectedUserIds.filter(prevId => {
          return prevId !== checkedId
        })
      } else {
        return [...prevSelectedUserIds, checkedId]
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const roomUserIds = [...selectedUserIds, myId]
    createChatroom(roomUserIds)
    closeModal()
  }
  return (
    <>
      <Modal.Header closeButton>Create Chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
          {contacts.map((contact, i) => (

            <Form.Group controlId={i} key={i}>
              <Form.Check
                type="checkbox"
                value={selectedUserIds.includes(contact.id)}
                label={contact.username}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}

          <Button type='submit' className="mt-2">Add</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
