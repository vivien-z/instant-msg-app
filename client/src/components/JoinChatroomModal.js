import React, { useState } from 'react'
import { Modal, Form, Button, Col } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider';
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function JoinChatroomModal({ closeModal, myId, myUsername, chatroom }) {
  const { addUserToChatroom } = useChatrooms()
  const [comfirm, setComfirm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault()
    addUserToChatroom(myId, chatroom)
  }

  return (
    <>
      <Modal.Header closeButton>Join Chatroom</Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>


          <Form.Label as="legend" column sm={2}>
            Do you want to join this chatroom?
          </Form.Label>

          <Col sm={10}>
            <Form.Check
              type="radio"
              label="first radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="second radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
            <Form.Check
              type="radio"
              label="third radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios3"
            />
          </Col>

          <Button onclick={setComfirm(true)} as="input" type='submit' className="mt-2">Confirm</Button>
          <Button onclick={setComfirm(false)} as="input" type='submit' className="mt-2">Cancel</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
