import React from 'react'
import { BackButton, Board } from 'Components'
import './BoardView.scss'
import { useRecoilValue } from 'recoil'
import { moveCountAtom } from 'State'
import {
  loseConditionSelector,
  readyGameSelector,
  winConditionSelector,
} from 'State/win-lose-state'

export const BoardView = () => {
  const gameIsReady = useRecoilValue(readyGameSelector)
  const moveCount = useRecoilValue(moveCountAtom)
  const winCondition = useRecoilValue(winConditionSelector)
  const loseCondition = useRecoilValue(loseConditionSelector)

  return (
    <div className="BoardView">
      <div className="BoardView__header">
        <BackButton />
        {gameIsReady && winCondition && (
          <span className="BoardView__count">You Win</span>
        )}
        {gameIsReady && loseCondition && (
          <span className="BoardView__count">You Lose</span>
        )}
        <span className="BoardView__count">
          Move Count: <strong>{moveCount}</strong>
        </span>
      </div>
      <div className="BoardView__body">
        <Board />
      </div>
    </div>
  )
}
