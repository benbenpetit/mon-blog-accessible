'use client'
import { ReactLenis } from '@studio-freight/react-lenis'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LenisWrapper: FC<Props> = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  )
}

export default LenisWrapper
