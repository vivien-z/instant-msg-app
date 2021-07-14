import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

import { useChatrooms } from '../contexts/ChatroomsProvider';

export default function OpenChatWindow({ myId, myUsername }) {
  const [msgText, setMsgText] = useState('')
  // const lastMsgRef = useRef()

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const { sendMessage, selectedChatroom } = useChatrooms()
  // const otherRoomUsers = selectedChatroom.roomUsers.filter(user => user.username !== myUsername).map(user => user.username)

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(selectedChatroom, msgText)
    setMsgText('')
  }

  return (

    <div className="d-flex flex-column flex-grow-1 m-1 p-2 rounded border bg-gray-l">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end">
          { selectedChatroom.messages.map((message, i) => {
            const lastMsg = (selectedChatroom.messages.length - 1) === i
            return (
              <div
                ref={ lastMsg ? setRef : null }
                key={i}
                className={`d-flex flex-column ${message.fromMe ? 'align-self-end' : 'mb-2'}`}
              >
                <div
                  className={`rounded px-3 py-1 ${message.fromMe ? 'bg-primary text-white' : 'bg-white'}`}
                >
                  {message.msgText}
                </div>
                <div
                  className={`text-muted small ${message.fromMe ? 'text-end pe-1' : 'ps-1'}`}
                >
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          }) }
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="">
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

      // <div className="bg-purple py-4 px-3 border-bottom">
      //   Message: <span className="text-muted">{otherRoomUsers.join(', ')}</span>
      // </div>
