import { inSameSpace } from 'Helpers'
import { atom, selector } from 'recoil'
import { PositionType } from 'Types'
import {
  hazardIdsSelector,
  hazardPositionAtom,
  pieceEntersHouseAtom,
  piecePositionAtom,
} from './pieces-state'

export const winConditionSelector = selector({
  key: 'winConditionSelector',
  get: ({ get }) => {
    const heroAtGoal = get(pieceEntersHouseAtom('hero'))
    const oppositeAtGoal = get(pieceEntersHouseAtom('opposite'))
    return heroAtGoal && oppositeAtGoal
  },
})

export const loseConditionSelector = selector({
  key: 'loseConditionSelector',
  get: ({ get }) => {
    const gameIsReady = get(readyGameSelector)
    const heroInHouse = get(pieceEntersHouseAtom('hero'))
    const oppositeInHouse = get(pieceEntersHouseAtom('opposite'))
    const heroPos = get(piecePositionAtom({ kind: 'character', side: 'hero' }))
    const oppositePos = get(
      piecePositionAtom({ kind: 'character', side: 'opposite' }),
    )
    const hazardIds = get(hazardIdsSelector)
    const hazardPositions = hazardIds.map((id) => get(hazardPositionAtom(id)))
    const isOnHazard = (charPos: PositionType) =>
      hazardPositions.some((pos) => inSameSpace(pos, charPos))
    const heroTouchedHazard = !heroInHouse && isOnHazard(heroPos)
    const oppositeTouchedHazard = !oppositeInHouse && isOnHazard(oppositePos)
    return gameIsReady && (heroTouchedHazard || oppositeTouchedHazard)
  },
})

export const readyGameSelector = selector({
  key: 'readyGameSelector',
  get: ({ get }) => {
    const heroPos = get(piecePositionAtom({ kind: 'character', side: 'hero' }))
    const oppositePos = get(
      piecePositionAtom({ kind: 'character', side: 'opposite' }),
    )
    return !inSameSpace(heroPos, oppositePos)
  },
})

export const resetGameAtom = atom({
  key: 'resetGame',
  default: true,
})
