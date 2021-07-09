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
        <div className="h-100 d-flex flex-column align-items-start justify-content-end px-3">
          { selectedChatroom.messages.map((message, i) => {
            return (
              <div
                key={i}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}
              >
                <div
                  className={`rounded px-3 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
                >
                  {message.msgText}
                </div>
                <div
                  className={`text-muted small ${message.fromMe ? 'text-end pe-1' : ''}`}
                >
                  {message.fromMe ? 'Me' : message.senderName}
                </div>
              </div>
            )
          }) }
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
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
