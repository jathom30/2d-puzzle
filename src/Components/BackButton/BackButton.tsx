import React from 'react'
import { Link } from 'react-router-dom'
import './BackButton.scss'

export const BackButton = () => {
  return (
    <Link className="BackButton" to="/">
      Back to home
    </Link>
  )
}
