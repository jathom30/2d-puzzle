import React, { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import {
  gridSizeAtom,
  wallDimensionsSelector,
  wallPositionSelector,
  piecePositionAtom,
  pieceEmojiAtom,
  wallHolePositionAtom,
  pieceHasItemAtom,
  hazardRadiusSelector,
} from 'State'
import { SideType } from 'Types'
import './Pieces.scss'

export const Piece: React.FC<{
  className?: string
  top: number
  left: number
  useDefaultStyle?: boolean
  height?: number
  width?: number
  emoji?: string
  item?: string
  before?: ReactNode
}> = ({
  className,
  top,
  left,
  useDefaultStyle = true,
  height,
  width,
  emoji,
  item,
  before,
}) => {
  const gridSize = useRecoilValue(gridSizeAtom)
  const defaultStyles = {
    height: gridSize,
    width: gridSize,
    fontSize: gridSize,
    lineHeight: gridSize,
  }
  const itemStyles = {
    width: gridSize / 2,
    height: gridSize / 2,
    fontSize: gridSize,
    lineHeight: `${gridSize}px`,
  }
  return (
    <div
      className={`${useDefaultStyle ? 'Piece' : ''} ${className || ''}`}
      style={{
        ...defaultStyles,
        top,
        left,
        ...(width && { width }),
        ...(height && { height }),
      }}
    >
      {before}
      <span>{emoji}</span>
      <span className="Piece__item" style={itemStyles}>
        {item}
      </span>
    </div>
  )
}

export const WallPiece = () => {
  const wallPosition = useRecoilValue(wallPositionSelector)
  const wallDimensions = useRecoilValue(wallDimensionsSelector)

  return (
    <Piece
      className="WallPiece"
      useDefaultStyle={false}
      top={wallPosition.y}
      left={wallPosition.x}
      width={wallDimensions.width}
      height={wallDimensions.height}
    />
  )
}

export const WallHolePiece = () => {
  const wallHolePos = useRecoilValue(wallHolePositionAtom)

  return (
    <Piece
      className="WallHolePiece"
      useDefaultStyle={false}
      top={wallHolePos.y}
      left={wallHolePos.x}
    />
  )
}

export const CharacterPiece: React.FC<{ side: SideType }> = ({ side }) => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'character', side }),
  )
  const hasItem = useRecoilValue(pieceHasItemAtom(side))
  const emoji = useRecoilValue(pieceEmojiAtom('character'))
  const item = useRecoilValue(pieceEmojiAtom('item'))
  return (
    <Piece
      left={x}
      top={y}
      className={`Character ${side
        .substring(0, 1)
        .toUpperCase()}${side.substring(1)}`}
      emoji={emoji}
      item={hasItem ? item : ''}
    />
  )
}

export const ItemPiece: React.FC<{ side: SideType }> = ({ side }) => {
  const item = useRecoilValue(pieceEmojiAtom('item'))
  const { x, y } = useRecoilValue(piecePositionAtom({ kind: 'item', side }))
  const otherSide = side === 'hero' ? 'Opposite' : 'Hero'
  return <Piece left={x} top={y} className={`Item ${otherSide}`} emoji={item} />
}

export const GoalPiece: React.FC<{ side: SideType }> = ({ side }) => {
  const { x, y } = useRecoilValue(piecePositionAtom({ kind: 'goal', side }))
  const goal = useRecoilValue(pieceEmojiAtom('goal'))
  return (
    <Piece
      left={x}
      top={y}
      className={`Goal ${side.substring(0, 1).toUpperCase()}${side.substring(
        1,
      )}`}
      emoji={goal}
    />
  )
}

export const HazardPiece: React.FC<{ side: SideType }> = ({ side }) => {
  const { x, y } = useRecoilValue(piecePositionAtom({ kind: 'hazard', side }))
  const radius = useRecoilValue(hazardRadiusSelector)
  const emoji = useRecoilValue(pieceEmojiAtom('hazard'))
  const boundaryStyles = {
    width: radius * 2,
    height: radius * 2,
  }
  return (
    <Piece
      left={x}
      top={y}
      className="Hazard"
      emoji={emoji}
      before={<div className="Hazard__boundary" style={boundaryStyles} />}
    />
  )
}
