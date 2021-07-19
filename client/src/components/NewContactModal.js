import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider'

export default function NewContactModal({ closeModal }) {
  const idRef = useRef()
  const usernameRef = useRef()
  const { createUser } = useUsers()

  function handleSubmit(e) {
    e.preventDefault()

    createUser(idRef.current.value, usernameRef.current.value) //could add 2nd argument(usernameCustomizedRef.current.value)
    closeModal()
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
          <Button type='submit' className="mt-2">Add</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
