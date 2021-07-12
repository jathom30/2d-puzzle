import { inSameSpace } from 'Helpers'
import { atom, selector } from 'recoil'
import { pieceEntersHouseAtom, piecePositionAtom } from './pieces-state'

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
    const heroHazardPos = get(
      piecePositionAtom({ kind: 'hazard', side: 'hero' }),
    )
    const oppositeHazardPos = get(
      piecePositionAtom({ kind: 'hazard', side: 'opposite' }),
    )
    const heroTouchedHazard =
      !heroInHouse &&
      (inSameSpace(heroPos, heroHazardPos) ||
        inSameSpace(heroPos, oppositeHazardPos))
    const oppositeTouchedHazard =
      !oppositeInHouse &&
      (inSameSpace(oppositePos, heroHazardPos) ||
        inSameSpace(oppositePos, oppositeHazardPos))
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
    return !(heroPos.x === oppositePos.x && heroPos.y === oppositePos.y)
  },
})

export const resetGameAtom = atom({
  key: 'resetGame',
  default: true,
})
