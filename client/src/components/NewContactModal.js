import { useState, useRef } from 'react'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { useUsers } from '../contexts/UsersProvider'

export default function NewContactModal({ closeModal, myId, myUsername }) {
  // const idRef = useRef()
  const [sId, setSId] = useState()
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
    const currentUser = users.find(user => user.username === myUsername)
    if (sId !== undefined) {
      const newContact = users.find(user => user.id === sId)
      addContact({user: currentUser, newContact: newContact.username})
      closeModal()
    } else {
      alert("Please select a user!")
    }
  }

  return (
    <>
      <Modal.Header closeButton>Add New Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={ handleSubmit }>
            <Row className="align-items-end" >
{/*              <Col xs={4}>
                <Form.Group>
                  <Form.Label>Id:</Form.Label>
                  <Form.Control type="text" ref={idRef} placeholder={sId || ''} ></Form.Control>
                </Form.Group>
              </Col>*/}
              <Col xs={9}>
                <Form.Group className="">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    ref={usernameRef}
                    onChange={(e) => e.preventDefault() || selectUser(e.target.value)}
                    required
                  >
                    <option value='1' default>--- select a user ---</option>
                    {nonContacts.map((user, i) => (
                      <option key={i+1} value={user.username} readOnly>{user.username}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Button type='submit' className="justify-content-end w-100">Add</Button>
              </Col>
            </Row>
        </Form>
      </Modal.Body>
    </>
  )
}
