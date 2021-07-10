import { selector } from 'recoil'
import { piecePositionAtom, sparkSideAtom } from './pieces-state'

export const voidPositionsSelector = selector({
  key: 'voidPositionsSelector',
  get: ({ get }) => {
    const heroPos = get(piecePositionAtom({ kind: 'character', side: 'hero' }))
    const oppositePos = get(
      piecePositionAtom({ kind: 'character', side: 'opposite' }),
    )
    const heroItem = get(piecePositionAtom({ kind: 'item', side: 'hero' }))
    const oppositeItem = get(
      piecePositionAtom({ kind: 'item', side: 'opposite' }),
    )
    const heroGoal = get(piecePositionAtom({ kind: 'goal', side: 'hero' }))
    const oppositeGoal = get(
      piecePositionAtom({ kind: 'goal', side: 'opposite' }),
    )
    const heroHazard = get(piecePositionAtom({ kind: 'hazard', side: 'hero' }))
    const oppositeHazard = get(
      piecePositionAtom({ kind: 'hazard', side: 'opposite' }),
    )
    const sparkSide = get(sparkSideAtom)
    const sparkPos = get(piecePositionAtom({ kind: 'hazard', side: sparkSide }))
    return [
      heroPos,
      oppositePos,
      heroItem,
      oppositeItem,
      heroGoal,
      oppositeGoal,
      heroHazard,
      oppositeHazard,
      sparkPos,
    ]
  },
})
