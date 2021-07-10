import { atom } from 'recoil'

export const itemAtom = atom({
  key: 'item',
  default: true,
})

export const hazardAtom = atom({
  key: 'hazard',
  default: true,
})

export const sparkAtom = atom({
  key: 'spark',
  default: true,
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
