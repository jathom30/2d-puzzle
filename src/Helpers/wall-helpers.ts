export const wallCheck = (
  position: number,
  upperBound: number,
  gridSize: number,
) => {
  switch (position) {
    case 0:
      return gridSize * 2
    case gridSize:
      return gridSize * 2
    case upperBound:
      return upperBound - gridSize * 3
    case upperBound - gridSize:
      return upperBound - gridSize * 3
    case upperBound - gridSize * 2:
      return upperBound - gridSize * 3
    default:
      return position
  }
}
