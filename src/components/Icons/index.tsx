import React from 'react'

export type CustomerIconProps = {
  height?: number
  width?: number
  color?: string
}
export const AttachMoney = ({ color = '#FFFFFF', height = 24, width = 24 }: CustomerIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${height}px`}
      viewBox="0 0 24 24"
      width={`${width}px`}
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </svg>
  )
}

export const HelpOutline = ({ color = '#FFFFFF', height = 24, width = 24 }: CustomerIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={`${height}px`}
      viewBox="0 0 24 24"
      width={`${width}px`}
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
    </svg>
  )
}
