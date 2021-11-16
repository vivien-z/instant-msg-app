import { useState, useRef } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider'

export default function NewContactModal({ closeModal, myId, myUsername }) {
  const [sId, setSId] = useState()
  const idRef = useRef()
  const usernameRef = useRef()
  const { users, addContact, getNonContactUsers } = useUsers()

  const currentUser = users.find(user => user.id === myId)
  const nonContacts = getNonContactUsers(currentUser)

  function selectUser(sUsername) {
    const selectedUser = users.find(user => user.username === sUsername)
    if (selectedUser !== undefined) {
      setSId(selectedUser.id)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const user = users.find(user => user.username === myUsername)
    if (sId !== undefined) {
      addContact({user: user, newContactId: sId})
      closeModal()
    } else {
      alert("Please try again!")
    }
  }

  return (
    <>
      <Modal.Header closeButton>Add New Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
            <Row>
              <Col xs={4}>
                <Form.Group>
                  <Form.Label>Id:</Form.Label>
                  <Form.Control readOnly type="text" ref={idRef} value={sId || ''} required></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={8}>
                <Form.Group className="">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    ref={usernameRef}
                    onChange={(e) => e.preventDefault() || selectUser(e.target.value)}
                    required
                  >
                    {nonContacts.map((user, i) => (
                      <option readOnly key={i} value={user.username} >{user.username}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button type='submit' className="mt-3 w-100">Add</Button>
              </Col>
            </Row>
        </Form>
      </Modal.Body>
    </>
  )
}
