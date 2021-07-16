import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { useUsers } from '../contexts/UsersProvider' //

export default function Login( { value, onIdSubmit, onChange }) {
  const usernameRef = useRef()
  const idRef = useRef()
  const { users, createUser } = useUsers() //

  function generateRandomUsername() {
    const rug = require('random-username-generator');
    // return rug.generate()
    // onUsernameSubmit(rug.generate())
    onChange(rug.generate())
  }

  function handleSubmit(e) {
    e.preventDefault()

    const username = usernameRef.current.value
    const id = idRef.current.value || uuidV4()

    onChange(username)
    onIdSubmit(id)

    let newId = false
    for (let i = 0; i < users.length; i++) {
      if (users[i].id !== id) {
        newId = true
      }
    }
    if (newId) {
      createUser(id, username)
    }
  }

  return (
    <Container className="justify-content-center align-items-center d-flex" style={{ height: "100vh"}}>
      <Form onSubmit={handleSubmit} className="w-50 border rounded">
        <div className="rounded-top bg-blue py-3 text-white text-center fs-4">
          Chatroom
        </div>
        <div className="p-4">
          <Form.Group className="mb-2">
            <Form.Label className="mb-2">User Id</Form.Label>
            <Form.Control
              type="text"
              name="user-id"
              ref={idRef}
              required
            />
            <Form.Label className="mb-2">Enter Your Username</Form.Label>
            <Form.Control
              type="text"
              ref={usernameRef}
              value={value}
              onChange={(e) => e.preventDefault() || onChange(e.target.value)}
              required>
            </Form.Control>
          </Form.Group>
          <Button type="submit" className="me-2">Login</Button>
          <Button variant="secondary" onClick={generateRandomUsername}>New Username</Button>
        </div>
      </Form>
    </Container>
  )
}
