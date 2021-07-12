import React from 'react'
import { createPortal } from 'react-dom'
import { BackButton, Button } from 'Components'
import './EndScreen.scss'
import { useReset } from 'Hooks'

export const EndScreen: React.FC<{ message: string }> = ({ message }) => {
  const handleReset = useReset()
  return createPortal(
    <div className="EndScreen">
      <h1>{message}</h1>
      <div className="EndScreen__buttons">
        <BackButton />
        <Button onClick={handleReset}>Restart</Button>
      </div>
    </div>,
    document.body,
  )
}
