import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Chatrooms from './Chatrooms'
import Contacts from './Contacts'
import NewChatroomModal from './NewChatroomModal'
import NewContactModal from './NewContactModal'

const CHATROOMS_KEY = "chatrooms"
const CONTACTS_KEY = "Contacts"

export default function Sidebar({ myId, myUsername }) {
  const [activeKey, setActiveKey] = useState(CHATROOMS_KEY)
  const [modalOpen, setModalOpen] = useState(false)

  const btnName = activeKey === CHATROOMS_KEY ? "Chatroom" : "Contact"

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: '260px'}} className='d-flex flex-column border'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>

        <Nav variant="tabs" className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={CHATROOMS_KEY}>Chatrooms</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className='border-right overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={CHATROOMS_KEY}>
            <Chatrooms />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts myUsername={myUsername} />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top small">
          Me: <span className="text-muted">{myUsername}</span>
        </div>
        <Button className='rounded-0' onClick={()=>setModalOpen(true)}>
          New {btnName}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === "chatrooms" ?
          <NewChatroomModal closeModal={closeModal} myUsername={myUsername}/> :
          <NewContactModal closeModal={closeModal}/>
        }
      </Modal>

    </div>
  )
}
