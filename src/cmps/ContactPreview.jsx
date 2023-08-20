import React, { useState, useRef, useEffect } from 'react'
import { utilService } from '../services/utilService'
import { useSwipeable } from 'react-swipeable'

export function ContactPreview({
  contact,
  onRemoveContact,
  onSelectContactId,
}) {
  const [swipeDistance, setSwipeDistance] = useState(0)
  const initial = contact.name.charAt(0).toUpperCase()
  const nameParts = contact.name.split(' ');
  const initials = nameParts[0].charAt(0).toUpperCase() + (nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '');
  const contactImg = contact.image ? contact.image : null;
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#4caf50', '#ff9800', '#ff5722'];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  // const contactImg = utilService.getImgUrl('../assets/imgs/contact.svg')
  const removeImg = utilService.getImgUrl('../assets/imgs/remove.svg')


  const handlers = useSwipeable({
    onSwiping: (event) => {
      if (event.dir === 'Left') {
        setSwipeDistance(Math.max(event.deltaX, -100))
      }
    },
    onSwipedLeft: () => {
      onRemoveContact(contact._id)
      setSwipeDistance(0)
    },
    onSwipedRight: () => {
      onSelectContactId(contact._id)
      setSwipeDistance(0)
    },
    onSwiping: (event) => {
      if (event.dir === 'Left') {
        setSwipeDistance(Math.max(event.deltaX, -100))
      } else if (event.dir === 'Right') {
        setSwipeDistance(Math.min(event.deltaX, 100))
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
  })

  return (
    <div className="contact-container">
      <div
        className="action-layer"
        style={{
          backgroundColor: swipeDistance > 0 ? '#298a29' : '#913535',
          opacity: Math.min(Math.abs(swipeDistance) / 100, 1),
        }}
      >
        <span className={swipeDistance > 0 ? 'left' : 'right'}>
          {swipeDistance > 0 ? 'Info' : 'Remove'}
        </span>
      </div>

      <article
        {...handlers}
        className="contact-preview"
        style={{ transform: `translateX(${swipeDistance}px)` }}
      >
        <section className="info">
        {contactImg ? (
            <img src={contactImg} alt="Contact" />
          ) : (
            <div className="contact-initial" style={{ backgroundColor: bgColor }}>{initials}</div>
          )}
          <h2>{contact.name}</h2>
        </section>
        <section className="actions">
          <button onClick={() => onRemoveContact(contact._id)}>
            {/* <img src={removeImg} alt="Remove Contact" /> */}
          </button>
        </section>
      </article>
    </div>
  )
}
