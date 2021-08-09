import { get5050 } from 'Helpers'
import { checkSpace, inSameSpace } from 'Helpers/space-helpers'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  hazardPositionAtom,
  piecePositionAtom,
  positionSelector,
  resetGameAtom,
  voidPositionsSelector,
  wallPositionAtom,
} from 'State'
import { PositionType, SideType } from 'Types'

interface PlacePieceType {
  (param: { kind: string; side: SideType }): PositionType
  (param: string): PositionType
}

export const usePlacePiece: PlacePieceType = (param: any) => {
  const wallPos = useRecoilValue(wallPositionAtom)
  const reset = useRecoilValue(resetGameAtom)
  const randomSide = get5050() ? 'hero' : 'opposite'
  const isHazard = typeof param === 'string'
  const side = isHazard ? randomSide : param.side
  const atom = isHazard ? hazardPositionAtom(param) : piecePositionAtom(param)
  const currentPos = useRecoilValue(atom)

  const setPiece = useSetRecoilState(atom)
  // TODO update voidPos
  const voidPos = useRecoilValue(voidPositionsSelector(side))
  const position = useRecoilValue(positionSelector(side))
  useEffect(() => {
    if (!inSameSpace(wallPos, { x: 0, y: 0 })) {
      setPiece(checkSpace(voidPos, position))
    }
  }, [reset, wallPos])
  return currentPos
}
