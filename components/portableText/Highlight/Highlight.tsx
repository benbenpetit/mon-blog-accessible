import { FC, ReactNode } from 'react'
import styles from './Highlight.module.scss'

interface Props {
  children: ReactNode
}

const Highlight: FC<Props> = ({ children }) => {
  return <span className={styles.wrapper}>{children}</span>
}

export default Highlight
