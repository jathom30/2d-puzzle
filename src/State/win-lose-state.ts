import { inSameSpace } from 'Helpers'
import { selector } from 'recoil'
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
      inSameSpace(heroPos, heroHazardPos) ||
      inSameSpace(heroPos, oppositeHazardPos)
    const oppositeTouchedHazard =
      inSameSpace(oppositePos, heroHazardPos) ||
      inSameSpace(oppositePos, oppositeHazardPos)
    return heroTouchedHazard || oppositeTouchedHazard
  },
})
