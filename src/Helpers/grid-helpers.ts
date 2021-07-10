export const randomOnGrid = (gridSize: number, max: number, min = 0) =>
  (Math.floor(Math.random() * (max - min)) + min) * gridSize
