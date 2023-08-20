import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contactService'
import { utilService } from '../services/utilService'
import { Navigate, useNavigate } from 'react-router-dom'
import { TransferFund } from '../cmps/TransferFund'
import { userService } from '../services/userService'

export function ContactDetailsPage({ contactId, onBack }) {
  const navigate = useNavigate()
  const [contact, setContact] = useState(null)
  const [user, setUser] = useState(null)
  


  async function loadUser() {
    try {
      const user = await userService.getUser()
      if (user) setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadContact()
    loadUser()
  }, [])

  async function loadContact() {
    const contact = await contactService.getContactById(contactId)
    setContact(contact)
  }
  const handleTransferCoins = async (contact, amount) => {
    const updatedUser = await userService.transferFunds(contact, amount, user)
    setUser(updatedUser)
  }

  const image = utilService.getImgUrl('../assets/imgs/contact.svg')

  if (!contact) return <div>Loading...</div>
  const nameParts = contact.name.split(' ');
  const initials = nameParts[0].charAt(0).toUpperCase() + (nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '');
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#ff9800', '#ff5722'];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];
  const contactImg = contact.image ? contact.image : null;
  return (
    <section className="contact-details">
      {contactImg ? (
        <img src={contactImg} alt="Contact" />
      ) : (
        <div className="contact-initial" style={{ backgroundColor: bgColor }}>{initials}</div>
      )}      <section>
        <h3 className='name'>{contact.name}</h3>
      </section>
      <section>
        <h3>{contact.email}</h3>
      </section>
      <section>
        <h3 className='phone'>{contact.phone}</h3>
      </section>

      <TransferFund
        contact={contact}
        maxCoins={user ? user.coins : 0}
        onTransferCoins={handleTransferCoins}
      />
      <section className="moves">
        <table>
          <thead>
            <tr>
              <th>To</th>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.moves
                .filter((move) => move.to === contact.name)
                .map((move, index) => (
                  <tr key={index}>
                    <td>{move.to}</td>
                    <td>{move.amount}$</td>
                    <td>{new Date(move.at).toLocaleString()}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </section>

      <div>
        <button onClick={() => navigate(`/contact/edit/${contactId}`)}>
          Edit
        </button>
        <button onClick={onBack}>Back</button>
      </div>
    </section>
  )
}
