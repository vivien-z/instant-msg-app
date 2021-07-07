import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function NewContactModal({ closeModal }) {
  const idRef = useRef()
  const usernameRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
      <Modal.Header closeButton>Add New Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
          <Form.Group>
            <Form.Label>Id:</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" ref={usernameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit'>Add</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
