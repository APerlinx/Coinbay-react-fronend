import React from 'react'
import { Link } from 'react-router-dom'

export function AddContactButton() {
  return (
    <Link to="/contact/edit/" className="fab-add-button">
      +
    </Link>
  )
}
