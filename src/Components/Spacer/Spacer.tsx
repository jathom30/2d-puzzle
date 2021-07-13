import React from 'react'
import { StandardLonghandProperties } from 'csstype'

export const Spacer = ({
  height = '1rem',
  width = '1rem',
}: {
  height?: StandardLonghandProperties['height']
  width?: StandardLonghandProperties['width']
}) => <div className="Spacer" aria-hidden style={{ height, width }} />
