import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function OpenChatWindow({ myId }) {
  const [msgText, setMsgText] = useState('')
  const { sendMessage, selectedChatroom } = useChatrooms()

  function handleSubmit(e) {
    e.preventDefault()
    //recipients = roomUsers - me
    // const recipients = selectedChatroom.roomUsers.filter(user => user.id !== myId)
    // console.log(recipients)
    sendMessage(selectedChatroom, msgText)
    setMsgText('')
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
              value={msgText}
              onChange={e => setMsgText(e.target.value)}
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
