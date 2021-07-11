import { checkSpace } from 'Helpers/space-helpers'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  piecePositionAtom,
  positionSelector,
  voidPositionsSelector,
} from 'State'
import { PositionType } from 'Types'

export const usePlacePiece = (
  kind: string,
  side: 'hero' | 'opposite',
): [PositionType, () => void] => {
  const voidPos = useRecoilValue(voidPositionsSelector)
  const setPiece = useSetRecoilState(piecePositionAtom({ kind, side }))
  const position = useRecoilValue(positionSelector(side))
  const finalPos = checkSpace(voidPos, position)
  return [finalPos, () => setPiece(finalPos)]
}