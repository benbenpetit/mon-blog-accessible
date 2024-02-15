import React, { FC, ReactNode } from 'react'
import NextLink from 'next/link'
import styles from './Link.module.scss'

interface Props {
  children: ReactNode
  value: {
    href: string
  }
}

const Link: FC<Props> = ({ children, value }) => {
  const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined

  return (
    <NextLink
      className={styles.wrapper}
      href={value.href}
      target="_blank"
      rel={rel}
    >
      {children}
    </NextLink>
  )
}

export default Link
