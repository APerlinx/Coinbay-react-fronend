import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactDetailsPage } from './ContactDetailsPage'
import { AddContactButton } from '../cmps/AddContactButton'
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contactActions'

export function ContactIndex() {
  const [contacts, setContacts] = useState(null)
  const [selectedContactId, setSelectedContactId] = useState(null)
  const [filterBy, setFilterBy] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    loadContacts()
  }, [filterBy])

  async function loadContacts() {
    const contacts = await contactService.getContacts(filterBy)
    setContacts(contacts)
  }

  function onChangeFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onSelectContactId(contactId) {
    setSelectedContactId(contactId)
  }

  async function onRemoveContact(contactId) {
    try {
      const updatedContacts = await contactService.deleteContact(contactId)
      setContacts(updatedContacts)
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <section className="contact-index">
            <div className="contact-list-header">
                <h2>Contacts</h2>
            </div>
      {!selectedContactId ? (
        <>
          <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
          <ContactList
            onSelectContactId={onSelectContactId}
            onRemoveContact={onRemoveContact}
            contacts={contacts}
          />
          <AddContactButton />
        </>
      ) : (
        <ContactDetailsPage
          onBack={() => setSelectedContactId(null)}
          contactId={selectedContactId}
        />
      )}
    </section>
  )
}
