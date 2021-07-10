import React from 'react'
import { BackButton, Board } from 'Components'
import './BoardView.scss'

export const BoardView = () => {
  return (
    <div className="BoardView">
      <div className="BoardView__header">
        <BackButton />
        <button
          className="BoardView__reset-btn"
          type="button"
          onClick={() => {}}
        >
          ResetGame
        </button>
      </div>
      <div className="BoardView__body">
        <Board />
      </div>
    </div>
  )
}
