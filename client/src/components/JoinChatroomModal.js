import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function JoinChatroomModal({ closeModal, myId, myUsername, chatroom }) {
  const { addUserToChatroom } = useChatrooms()
  const [confirm, setConfirm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault()
    if (confirm) {
      addUserToChatroom(myId, chatroom)
    }
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>Join Chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
          <Form.Label as="legend" column >
            Do you want to join this chatroom?
          </Form.Label>
          <div>
            <Button onClick={() => setConfirm(true)} type='submit' className="mt-2 me-2">Confirm</Button>
            <Button onClick={() => setConfirm(false)} type='submit' className="mt-2">Cancel</Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  )
}
