import React from 'react'
import { Select, Spacer } from 'Components'
import './Madlib.scss'
import { useRecoilState } from 'recoil'
import { pieceEmojiAtom } from 'State'

const characterChoices = {
  doctors: ['👨‍⚕️', '👩‍⚕️'],
  detectives: ['🕵️‍♂️', '🕵️‍♀️'],
  chefs: ['👨‍🍳', '👩‍🍳'],
  teachers: ['👨‍🏫', '👩‍🏫'],
  graduates: ['👨‍🎓', '👩‍🎓'],
  astronauts: ['👨‍🚀', '👩‍🚀'],
  welders: ['👨‍🏭', '👩‍🏭'],
  zombies: ['🧟‍♂️', '🧟‍♀️'],
  cops: ['👮', '👮‍♀️'],
}

const itemChoices = {
  kiwis: '🥝',
  cake: '🎂',
  strawberries: '🍓',
  drinks: '🍹',
  peaches: '🍑',
  bananas: '🍌',
  eggplants: '🍆',
  tomatoes: '🍅',
  peanuts: '🥜',
  keys: '🔑',
  donuts: '🍩',
}

const goalChoices = {
  homes: '🏠',
  cars: '🏎️',
  policeCars: '🚓',
  boats: '🛥️',
  planes: '✈️',
}

const hazardChoices = {
  zombies: '🧟',
  cops: '👮',
  devils: '👿',
  fire: '🔥',
  lions: '🦁',
}

const createOptions = (choices: { [key: string]: string | string[] }) => {
  return Object.values(choices).map((choice) => {
    if (Array.isArray(choice)) {
      return { label: choice[0] }
    }
    return { label: choice }
  })
}

export const Madlib = () => {
  const [characters, setCharacters] = useRecoilState(
    pieceEmojiAtom('character'),
  )
  const [items, setItems] = useRecoilState(pieceEmojiAtom('item'))
  const [goals, setGoals] = useRecoilState(pieceEmojiAtom('goal'))
  const [hazards, setHazards] = useRecoilState(pieceEmojiAtom('hazard'))

  return (
    <div className="Madlib">
      <span>Two</span>
      <Select
        placeholder="select characters"
        options={createOptions(characterChoices)}
        selectedOption={characters ? { label: characters } : undefined}
        onChange={(option) => option?.label && setCharacters(option.label)}
        maxHeight={300}
      />
      <Spacer />
      <span>have to find their</span>
      <Select
        placeholder="select items"
        options={createOptions(itemChoices)}
        selectedOption={items ? { label: items } : undefined}
        onChange={(option) => option?.label && setItems(option.label)}
        maxHeight={300}
      />
      <Spacer />
      <span>before they can safely escape into their</span>
      <Select
        placeholder="select items"
        options={createOptions(goalChoices)}
        selectedOption={goals ? { label: goals } : undefined}
        onChange={(option) => option?.label && setGoals(option.label)}
        maxHeight={300}
      />
      <Spacer />
      <span>while avoiding the</span>
      <Select
        placeholder="select items"
        options={createOptions(hazardChoices)}
        selectedOption={hazards ? { label: hazards } : undefined}
        onChange={(option) => option?.label && setHazards(option.label)}
        maxHeight={300}
      />
    </div>
  )
}
