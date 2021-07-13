import React from 'react'
import { Link } from 'react-router-dom'
import image from 'Assets/dont_get_caught.png'
import { Madlib } from 'Components'
import './HomeView.scss'

export const HomeView = () => {
  return (
    <div className="HomeView">
      <div className="HomeView__hero-img">
        <img src={image} alt="logo" />
      </div>
      <div className="HomeView__madlib">
        <Madlib />
      </div>
      <div className="HomeView__routes">
        <Link className="HomeView__route" to="/board">
          Play
        </Link>
        <Link className="HomeView__route" to="/how-to">
          How to
        </Link>
        <Link className="HomeView__route" to="/settings">
          Settings
        </Link>
      </div>
    </div>
  )
}
