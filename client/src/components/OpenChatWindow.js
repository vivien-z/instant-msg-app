import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function OpenChatWindow() {
  const [message, setMessage] = useState('')
  const { sendMessage, selectedChatroom } = useChatrooms()

  function handleSubmit(e) {
    e.preventDefault()
    const receiverIds = selectedChatroom.roomUsers.map(user => user.id)

    sendMessage(receiverIds, message)
    setMessage('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">

      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          {/*// send button to be attached with the form*/}
          <InputGroup>
            <Form.Control
              as="textarea"
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ height: '75px', resize: 'none'}}
              required
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
            // <InputGroup.Append>
            // </InputGroup.Append>
