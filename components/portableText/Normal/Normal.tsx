import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Normal: FC<Props> = ({ children }) => {
  return <p>{children}</p>
}

export default Normal
