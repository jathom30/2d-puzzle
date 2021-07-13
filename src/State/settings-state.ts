import { atom } from 'recoil'

export const itemAtom = atom({
  key: 'item',
  default: true,
})

export const hazardCountAtom = atom({
  key: 'hazardCount',
  default: 2,
})

export const readyAtom = atom({
  key: 'ready',
  default: false,
})

export const winAtom = atom({
  key: 'win',
  default: false,
})

export const loseAtom = atom({
  key: 'lose',
  default: false,
})
