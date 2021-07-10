import React from 'react'
import { BackButton } from 'Components'
import './HowToView.scss'

export const HowToView = () => {
  return (
    <div className="HowToView">
      <div className="HowToView__wrapper">
        <div className="HowToView__top-bar">
          <BackButton />
        </div>
        <div className="HowToView__tldr">
          <h1>tl;dr</h1>
          <p>
            Pick up your keys and get in your home without running into any bad
            guys.
          </p>
        </div>
        <p className="HowToView__label">Instructions</p>
        <div className="HowToView__instructions">
          <div className="HowToView__group">
            <p className="HowToView__main">
              Simultaneously control two characters at once
            </p>
            <p>
              The character North or West of the wall (depending on the
              wall&apos;s orientation) will move with &quot;WASD&quot;. However,
              be careful! The other character will move at the same time, but in
              the opposite direction. Try to plan your moves ahead to avoid the
              bad guys (red circle)!
            </p>
          </div>
          <div className="HowToView__group">
            <p className="HowToView__main">
              Each character&apos;s avatar, key, and house are color-coded
            </p>
            <p>
              Navagate each character to pick up their keys. Then, guide each
              character to their house all while avoiding any bad guys.
            </p>
          </div>
          <div className="HowToView__group">
            <p className="HowToView__main">How to Win:</p>
            <p>
              Land each character (with their keys) on their house at the same
              time.
            </p>
          </div>
          <div className="HowToView__group">
            <p className="HowToView__main">How to Lose:</p>
            <p>Run into the bad guys.</p>
          </div>
        </div>
        <p className="HowToView__label">Notes</p>
        <div className="HowToView__notes">
          <div className="HowToView__group">
            <p className="HowToView__main">Experiment with screen/font sizes</p>
            <p>
              The game&apos;s board will update your characters position based
              on the size of the screen and your font settings. If it looks like
              it might help, expand your screen to give you more wiggle room or
              shrink your screen to bring your objective to you.
            </p>
          </div>
          <div className="HowToView__group">
            <p className="HowToView__main">Not all games are winnable</p>
            <p>
              Due to the random generation of each board, not all games are
              winnable.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
