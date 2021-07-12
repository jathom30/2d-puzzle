import React from 'react'
import './Button.scss'

export const Button: React.FC<{ onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <button type="button" onClick={onClick} className="Button">
      {children}
    </button>
  )
}
