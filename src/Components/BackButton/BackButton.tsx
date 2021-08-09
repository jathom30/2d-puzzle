import { useReset } from 'Hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import './BackButton.scss'

export const BackButton = () => {
  const resetGame = useReset()
  return (
    <Link className="BackButton" onClick={resetGame} to="/">
      Back to home
    </Link>
  )
}
