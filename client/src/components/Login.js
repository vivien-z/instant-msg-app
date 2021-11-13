import { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { useUsers } from '../contexts/UsersProvider' //

export default function Login( { value, onChange, onIdSubmit }) {
  const usernameRef = useRef()
  const { users, createUser } = useUsers() //

  function generateRandomUsername() {
    const rug = require('random-username-generator').generate();
    onChange(rug.slice(-10).replace(/-/g, ''))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const username = usernameRef.current.value
    let id

    let newUser = false
    for (let i = 0; i < users.length; i++) {
      if (users[i].username !== username) {
        newUser = true
      }
    }
    if (users.length === 0 || newUser) {
      id = uuidV4().slice(0, 7)
      createUser(id, username)
    }
    if (!newUser) {
      id = users.find(user => user.username === username).id
    }

    onChange(username)
    onIdSubmit(id)
  }

  return (
    <Container className="justify-content-center align-items-center d-flex" style={{ height: "100vh"}}>

     <Form onSubmit={handleSubmit} className="w-50 border rounded">
        <div className="rounded-top bg-blue py-3 text-white text-center fs-4">
          Chatroom
        </div>
        <div className="p-4">
          <Form.Group className="mb-3">
            <Form.Label className="mb-2">Username</Form.Label>
            <Form.Control
              type="text"
              ref={usernameRef}
              value={value}
              onChange={(e) => e.preventDefault() || onChange(e.target.value)}
              required>
            </Form.Control>
          </Form.Group>
          <Button type="submit" className="me-2">Login</Button>
          <Button variant="secondary" onClick={generateRandomUsername}>Random Username</Button>
        </div>
      </Form>
    </Container>
  )
}
