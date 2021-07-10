import React from 'react'
import { BackButton } from 'Components'
import './SettingsView.scss'
import { useRecoilState } from 'recoil'
import { hazardAtom, itemAtom, pieceEmojiAtom, sparkAtom } from 'State'

const emojiChoices = [
  '👨‍⚕️',
  '👩‍⚕️',
  '🕵️‍♂️',
  '🕵️‍♀️',
  '👨‍🍳',
  '👩‍🍳',
  '👨‍🏫',
  '👩‍🏫',
  '👨‍🎓',
  '👩‍🎓',
  '👨‍🚀',
  '👩‍🚀',
  '👨‍🏭',
  '👩‍🏭',
  '🧟‍♂️',
  '🧟‍♀️',
  '👮',
  '👮‍♀️',
]

// TODO: add focus state, add info popover why some are unselectable
const EmojiSelect: React.FC<{
  label: string
  selected: string
  onChange: (newSelected: string) => void
  unselectable?: string[]
}> = ({ label, selected, onChange, unselectable }) => {
  const isUnselectable = (choice: string) =>
    unselectable?.some((i) => i === choice)
  return (
    <div className="EmojiSelect">
      {emojiChoices.map((choice) => (
        <label
          key={choice}
          htmlFor={`${choice}-${label}`}
          className={`EmojiSelect__label ${
            selected === choice ? 'EmojiSelect__label--is-selected' : ''
          } ${
            isUnselectable(choice) ? 'EmojiSelect__label--is-unselectable' : ''
          }`}
        >
          <input
            type="radio"
            name={choice}
            id={`${choice}-${label}`}
            value={choice}
            checked={selected === choice}
            onChange={() => onChange(choice)}
            disabled={isUnselectable(choice)}
          />
          {choice}
        </label>
      ))}
    </div>
  )
}

const ItemCheckbox: React.FC<{
  label: string
  item: boolean
  onChange: (newItem: boolean) => void
}> = ({ label, item, onChange }) => {
  return (
    <div className={`ItemCheckbox ${item ? 'ItemCheckbox--checked' : ''}`}>
      <label htmlFor={label} className="ItemCheckbox__wrapper-label">
        <div className="ItemCheckbox__input-wrapper">
          <input
            className="ItemCheckbox__input"
            type="checkbox"
            onChange={() => onChange(!item)}
            id={label}
            checked={item}
          />
          <div className="ItemCheckbox__checkmark" />
        </div>
        {label && <span className="ItemCheckbox__label">{label}</span>}
      </label>
    </div>
  )
}

export const SettingsView = () => {
  const [hero, setHero] = useRecoilState(pieceEmojiAtom('hero'))
  const [opposite, setOpposite] = useRecoilState(pieceEmojiAtom('opposite'))
  const [hazard, setHazard] = useRecoilState(pieceEmojiAtom('hazard'))

  const [hasItem, setHasItem] = useRecoilState(itemAtom)
  const [hasHazard, setHasHazard] = useRecoilState(hazardAtom)
  const [hasSpark, setHasSpark] = useRecoilState(sparkAtom)

  return (
    <div className="SettingsView">
      <div className="SettingsView__container">
        <div className="SettingsView__top-bar">
          <BackButton />
        </div>
        <p className="label-container">Settings</p>
        <div className="wrapper-container">
          <div className="rule-wrapper">
            <p>Items on board</p>
            <div className="rules-rule">
              <ItemCheckbox label="Item" item={hasItem} onChange={setHasItem} />
              <ItemCheckbox
                label="Hazard"
                item={hasHazard}
                onChange={setHasHazard}
              />
              <ItemCheckbox
                label="Spark"
                item={hasSpark}
                onChange={setHasSpark}
              />
            </div>
          </div>
          <div className="rule-wrapper">
            <p>Hero Icon</p>
            <EmojiSelect
              label="hero"
              selected={hero}
              onChange={setHero}
              unselectable={[opposite, hazard]}
            />
          </div>
          <div className="rule-wrapper">
            <p>Opposite Icon</p>
            <EmojiSelect
              label="opposite"
              selected={opposite}
              onChange={setOpposite}
              unselectable={[hero, hazard]}
            />
          </div>
          <div className="rule-wrapper">
            <p>Hazard Icons</p>
            <EmojiSelect
              label="hazard"
              selected={hazard}
              onChange={setHazard}
              unselectable={[opposite, hero]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
