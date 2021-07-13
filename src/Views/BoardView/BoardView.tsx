import React from 'react'
import { BackButton, Board, Button } from 'Components'
import './BoardView.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { hazardCountAtom, moveCountAtom } from 'State'
import {
  loseConditionSelector,
  winConditionSelector,
} from 'State/win-lose-state'
import { EndScreen } from 'Components/EndScreen'
import { useReset } from 'Hooks'

export const BoardView = () => {
  const resetGame = useReset()
  const moveCount = useRecoilValue(moveCountAtom)
  const winCondition = useRecoilValue(winConditionSelector)
  const loseCondition = useRecoilValue(loseConditionSelector)
  const [hazardCount, setHazardCount] = useRecoilState(hazardCountAtom)

  return (
    <div className="BoardView">
      <div className="BoardView__header">
        <BackButton />
        <div className="BoardView__hazard-count">
          <Button
            onClick={() =>
              setHazardCount((prevCount) => {
                if (prevCount === 0) return prevCount
                return prevCount - 1
              })
            }
          >
            -
          </Button>
          <span>Enemy Count ({hazardCount})</span>
          <Button onClick={() => setHazardCount((prevCount) => prevCount + 1)}>
            +
          </Button>
        </div>
        <span className="BoardView__count">
          Move Count: <strong>{moveCount}</strong>
        </span>
        <Button onClick={resetGame}>Reset Game</Button>
      </div>
      <div className="BoardView__body">
        <Board />
      </div>
      {(loseCondition || winCondition) && (
        <EndScreen message={winCondition ? 'You Won!' : 'Game Over'} />
      )}
    </div>
  )
}
