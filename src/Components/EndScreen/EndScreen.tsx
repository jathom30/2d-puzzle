import React from 'react'
import { createPortal } from 'react-dom'
import { BackButton, Button } from 'Components'
import './EndScreen.scss'
import { useReset } from 'Hooks'
import { useRecoilValue } from 'recoil'
import { hazardCountAtom, moveCountAtom } from 'State'

export const EndScreen: React.FC<{ message: string }> = ({ message }) => {
  const moveCount = useRecoilValue(moveCountAtom)
  const hazardCount = useRecoilValue(hazardCountAtom)
  const handleReset = useReset()
  return createPortal(
    <div className="EndScreen">
      <h1>{message}</h1>
      <span>
        in <strong>{moveCount}</strong> moves with{' '}
        <strong>{hazardCount}</strong> enemies on the board.
      </span>
      <div className="EndScreen__buttons">
        <BackButton />
        <Button onClick={handleReset}>Restart</Button>
      </div>
    </div>,
    document.body,
  )
}
