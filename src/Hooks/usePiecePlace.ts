import { get5050 } from 'Helpers'
import { checkSpace } from 'Helpers/space-helpers'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  hazardPositionAtom,
  piecePositionAtom,
  positionSelector,
  voidPositionsSelector,
} from 'State'
import { PositionType, SideType } from 'Types'

interface PlacePieceType {
  (param: { kind: string; side: SideType }): [PositionType, () => void]
  (param: string): [PositionType, () => void]
}

export const usePlacePiece: PlacePieceType = (
  param: any,
): [PositionType, () => void] => {
  const randomSide = get5050() ? 'hero' : 'opposite'
  const isHazard = typeof param === 'string'
  const side = isHazard ? randomSide : param.side
  const atom = isHazard ? hazardPositionAtom(param) : piecePositionAtom(param)
  const currentPos = useRecoilValue(atom)

  // TODO update voidPos
  const voidPos = useRecoilValue(voidPositionsSelector(side))
  const setPiece = useSetRecoilState(atom)
  const position = useRecoilValue(positionSelector(side))
  const finalPos = checkSpace(voidPos, position)
  if (currentPos.x >= 0 && currentPos.y >= 0) {
    return [currentPos, () => undefined]
  }
  return [finalPos, () => setPiece(finalPos)]
}
