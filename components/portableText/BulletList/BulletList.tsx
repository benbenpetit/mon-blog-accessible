import { FC, ReactNode } from 'react'
import styles from './BulletList.module.scss'

interface Props {
  children: ReactNode
}

const BulletList: FC<Props> = ({ children }) => {
  return <ul className={styles.wrapper}>{children}</ul>
}

export default BulletList
