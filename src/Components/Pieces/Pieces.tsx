import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  gridSizeAtom,
  wallDimensionsSelector,
  wallPositionSelector,
  piecePositionAtom,
  sparkSideAtom,
  pieceEmojiAtom,
  wallHolePositionAtom,
} from 'State'
import './Pieces.scss'

export const Piece: React.FC<{
  className?: string
  top: number
  left: number
  useDefaultStyle?: boolean
  height?: number
  width?: number
  emoji?: string
}> = ({
  className,
  top,
  left,
  useDefaultStyle = true,
  height,
  width,
  emoji,
}) => {
  const gridSize = useRecoilValue(gridSizeAtom)
  const defaultStyles = {
    height: gridSize,
    width: gridSize,
    fontSize: gridSize,
    lineHeight: gridSize,
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
      {emoji}
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

export const HeroPiece = () => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'character', side: 'hero' }),
  )
  const emoji = useRecoilValue(pieceEmojiAtom('hero'))
  return <Piece left={x} top={y} className="Hero" emoji={emoji} />
}

export const OppositePiece = () => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'character', side: 'opposite' }),
  )
  const emoji = useRecoilValue(pieceEmojiAtom('opposite'))
  return <Piece left={x} top={y} className="Opposite" emoji={emoji} />
}

export const HeroItem = () => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'item', side: 'opposite' }),
  )
  return <Piece left={x} top={y} className="Hero" emoji="🔑" />
}

export const OppositeItem = () => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'item', side: 'hero' }),
  )
  return <Piece left={x} top={y} className="Opposite" emoji="🔑" />
}

export const HeroGoalPiece = () => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'goal', side: 'hero' }),
  )
  return <Piece left={x} top={y} className="Hero" emoji="🏠" />
}

export const OppositeGoalPiece = () => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'goal', side: 'opposite' }),
  )
  return <Piece left={x} top={y} className="Opposite" emoji="🏠" />
}

export const HeroHazardPiece = () => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'hazard', side: 'hero' }),
  )
  const emoji = useRecoilValue(pieceEmojiAtom('hazard'))
  return <Piece left={x} top={y} className="Hazard" emoji={emoji} />
}

export const OppositeHazardPiece = () => {
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'hazard', side: 'opposite' }),
  )
  const emoji = useRecoilValue(pieceEmojiAtom('hazard'))
  return <Piece left={x} top={y} className="Hazard" emoji={emoji} />
}

export const SparkPiece = () => {
  const sparkSide = useRecoilValue(sparkSideAtom)
  const { x, y } = useRecoilValue(
    piecePositionAtom({ kind: 'spark', side: sparkSide }),
  )
  return <Piece left={x} top={y} className="Spark" emoji="⚡️" />
}
