import { useState, useRef } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider'

export default function NewContactModal({ closeModal }) {
  const [sId, setSId] = useState()
  const idRef = useRef()
  const usernameRef = useRef()
  const { users, createUser } = useUsers()

  function selectUser(sUsername) {
    const selectedUser = users.find(user => user.username === sUsername)
    if (selectedUser !== undefined) {
      setSId(selectedUser.id)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    createUser(idRef.current.value, usernameRef.current.value)
    closeModal()
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
                    {users.map((user, i) => (
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

          // <Form.Group>
          //   <Form.Label>Username:</Form.Label>
          //   <Form.Control type="text" ref={usernameRef} required></Form.Control>
          // </Form.Group>
