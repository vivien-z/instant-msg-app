import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ childern }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  function createContact(id, username) {
    setContacts(prevContacts => {
      return [...prevContacts, { id, username }]
    })

  }

  return (
    <ContactsContext.Provider value={ {contacts, createContact} }>
      {childern}
    </ContactsContext.Provider>
  )
}
