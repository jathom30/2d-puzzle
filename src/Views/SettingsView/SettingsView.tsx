import React from 'react'
import { BackButton } from 'Components'
import './SettingsView.scss'
import { useRecoilState } from 'recoil'
import { hazardCountAtom } from 'State'

export const SettingsView = () => {
  const [hazardCount, setHazardCount] = useRecoilState(hazardCountAtom)

  return (
    <div className="SettingsView">
      <div className="SettingsView__top-bar">
        <BackButton />
      </div>
      <p className="SettingsView__label">Settings</p>
      <div className="SettingsView__wrapper">
        <label className="SettingsView__input" htmlFor="hazardCount">
          <span>Hazard Count</span>
          <input
            id="hazardCount"
            type="number"
            value={hazardCount}
            onChange={(e) => setHazardCount(parseInt(e.target.value, 10))}
          />
        </label>
        <p>
          Increasing the number of hazards will increase the game&apos;s
          difficulty.
        </p>
      </div>
    </div>
  )
}
