import React from 'react'
import { createPortal } from 'react-dom'
import { BackButton, Button } from 'Components'
import './EndScreen.scss'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  moveCountAtom,
  pieceEntersHouseAtom,
  pieceHasItemAtom,
  resetGameAtom,
} from 'State'

export const EndScreen: React.FC<{ message: string }> = ({ message }) => {
  const setReset = useSetRecoilState(resetGameAtom)
  const resetHeroInHouse = useResetRecoilState(pieceEntersHouseAtom('hero'))
  const resetOppositeInHouse = useResetRecoilState(
    pieceEntersHouseAtom('opposite'),
  )
  const resetHeroHasItem = useResetRecoilState(pieceHasItemAtom('hero'))
  const resetOppositeHasItem = useResetRecoilState(pieceHasItemAtom('opposite'))
  const resetMoveCount = useResetRecoilState(moveCountAtom)

  const handleReset = () => {
    setReset((prev) => !prev)
    resetHeroHasItem()
    resetOppositeHasItem()
    resetHeroInHouse()
    resetOppositeInHouse()
    resetMoveCount()
  }
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
