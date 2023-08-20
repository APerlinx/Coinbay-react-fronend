import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { useNavigate, useParams } from 'react-router-dom'
import { utilService } from '../services/utilService'

export function ContactEdit() {
  const [contact, setContact] = useState(contactService.getEmptyContact())
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadContact()
  }, [])

  async function loadContact() {
    const contactId = params.id
    try {
      if (contactId) {
        const contact = await contactService.getContactById(contactId)
        setContact(contact)
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
      default:
        break
    }

    setContact((prevContact) => ({
      ...prevContact,
      [field]: value,
    }))
  }

  async function onSaveContact(ev) {
    ev.preventDefault()
    try {
      await contactService.saveContact(contact)
      navigate('/')
    } catch (error) {}
  }

  function handleImageChange({ target }) {
    const file = target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setContact((prevContact) => ({
        ...prevContact,
        image: reader.result,
      }))
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const image =
    contact.image || utilService.getImgUrl('../assets/imgs/contact.svg')

  const { name, phone, email } = contact
  return (
    <section className="contact-edit">
      <div className="contact-list-header">
        <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
      </div>

      <form onSubmit={onSaveContact}>
        <div className="image-container">
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            id="image"
            style={{ display: 'none' }}
          />
          <img
            src={image}
            alt="Preview"
            onClick={() => document.getElementById('image').click()}
          />
        </div>

        {contact.image && <img src={contact.image} alt="Preview" width="100" />}
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          value={email}
          type="text"
          name="email"
          id="email"
        />

        <label htmlFor="phone">Phone</label>
        <input
          onChange={handleChange}
          value={phone}
          type="text"
          name="phone"
          id="phone"
        />
        <button>Save</button>
      </form>
    </section>
  )
}
