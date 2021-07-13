import React, { useState } from 'react'
import { Tab, Nav, Button, Modal, Row, Col } from 'react-bootstrap'
import Chatrooms from './Chatrooms'
import Contacts from './Contacts'
import NewChatroomModal from './NewChatroomModal'
import NewContactModal from './NewContactModal'
import '../styles/global.css'
import styles from '../styles/Sidebar.module.css';

const CHATROOMS_KEY = "Chats"
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
      <div className={`${styles.profile} purple-bg p-3 border-bottom`}>
        <span className={`${styles.avatar}`}>{myUsername[0].toUpperCase()}</span><span className="">{myUsername}</span>
      </div>

      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Row>
          <Col sm={3}>
            <Nav variant="tabs" className={`${styles.navTab} justify-content-center align-items-start`}>
              <Nav.Item>
                <Nav.Link eventKey={CHATROOMS_KEY}>Chats</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className='border-right overflow-auto flex-grow-1'>
              <Tab.Pane eventKey={CHATROOMS_KEY}>
                <Chatrooms myUsername={myUsername} />
              </Tab.Pane>
              <Tab.Pane eventKey={CONTACTS_KEY}>
                <Contacts myUsername={myUsername} />
              </Tab.Pane>
            </Tab.Content>

          </Col>

        </Row>

        <Button className='rounded-0' onClick={()=>setModalOpen(true)}>
          New {btnName}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === "Chats" ?
          <NewChatroomModal closeModal={closeModal} myId={myId} myUsername={myUsername}/> :
          <NewContactModal closeModal={closeModal}/>
        }
      </Modal>

    </div>
  )
}
