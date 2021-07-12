import { useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  moveCountAtom,
  pieceEntersHouseAtom,
  pieceHasItemAtom,
  resetGameAtom,
} from 'State'

export const useReset = () => {
  const setReset = useSetRecoilState(resetGameAtom)
  const resetHeroInHouse = useResetRecoilState(pieceEntersHouseAtom('hero'))
  const resetOppositeInHouse = useResetRecoilState(
    pieceEntersHouseAtom('opposite'),
  )
  const resetHeroHasItem = useResetRecoilState(pieceHasItemAtom('hero'))
  const resetOppositeHasItem = useResetRecoilState(pieceHasItemAtom('opposite'))
  const resetMoveCount = useResetRecoilState(moveCountAtom)

  return () => {
    setReset((prev) => !prev)
    resetHeroHasItem()
    resetOppositeHasItem()
    resetHeroInHouse()
    resetOppositeInHouse()
    resetMoveCount()
  }
}
