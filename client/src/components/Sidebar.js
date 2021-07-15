import React, { useState } from 'react'
import { Tab, Nav, Button, Modal, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Sidebar.module.css';

import Chatrooms from './Chatrooms'
import Contacts from './Contacts'
import NewChatroomModal from './NewChatroomModal'
import NewContactModal from './NewContactModal'

const CHATROOMS_KEY = "Chats"
const CONTACTS_KEY = "Contacts"

export default function Sidebar({ myId, myUsername }) {
  const [activeKey, setActiveKey] = useState(CHATROOMS_KEY)
  const [modalOpen, setModalOpen] = useState(false)

  const btnName = activeKey === CHATROOMS_KEY ? "Chatroom" : "Contact"
  const chatrooms = <FontAwesomeIcon icon={faComments} />
  const contacts = <FontAwesomeIcon icon={faUserFriends} />

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: '300px'}} className={`${styles.border} d-flex flex-column`}>

      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Row className="flex-grow-1">
          <Col sm={3} className={`${styles.navTab} pt-4 bg-purple`}>
            <span className={`${styles.avatar} mb-3`}>{myUsername[0].toUpperCase()}</span>
            <hr />
            <Nav variant="pills" className={`justify-content-center align-items-start`}>
              <Nav.Item className={`${styles.navIcon} mb-2`}>
                <Nav.Link eventKey={CHATROOMS_KEY}>{chatrooms}</Nav.Link>
              </Nav.Item>
              <Nav.Item className={`${styles.navIcon} mb-2`}>
                <Nav.Link eventKey={CONTACTS_KEY}>{contacts}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className="px-0 pl-1">
            <div className='d-flex flex-column py-1 bg-gray-l h-100'>
              <Tab.Content className='overflow-auto flex-grow-1'>
                <Tab.Pane eventKey={CHATROOMS_KEY}>
                  <p className={`${styles.tabTitle}`}>Chatrooms</p>
                  <Chatrooms myId={myId} myUsername={myUsername} />
                </Tab.Pane>
                <Tab.Pane eventKey={CONTACTS_KEY}>
                  <p className={`${styles.tabTitle}`}>Contacts</p>
                  <Contacts myId={myId} myUsername={myUsername} />
                </Tab.Pane>
              </Tab.Content>
              <Button className={`${styles.buttom} align-items-end w-100`} onClick={()=>setModalOpen(true)}>
                New {btnName}
              </Button>
            </div>
          </Col>
        </Row>
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
