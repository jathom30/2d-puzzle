import React from 'react'
import { BackButton, Board } from 'Components'
import './BoardView.scss'
import { useRecoilValue } from 'recoil'
import { moveCountAtom } from 'State'
import {
  loseConditionSelector,
  winConditionSelector,
} from 'State/win-lose-state'
import { EndScreen } from 'Components/EndScreen'

export const BoardView = () => {
  const moveCount = useRecoilValue(moveCountAtom)
  const winCondition = useRecoilValue(winConditionSelector)
  const loseCondition = useRecoilValue(loseConditionSelector)

  return (
    <div className="BoardView">
      <div className="BoardView__header">
        <BackButton />
        <span className="BoardView__count">
          Move Count: <strong>{moveCount}</strong>
        </span>
      </div>
      <div className="BoardView__body">
        <Board />
      </div>
      {(loseCondition || winCondition) && (
        <EndScreen message={winCondition ? 'You Win!' : 'Game Over'} />
      )}
    </div>
  )
}
