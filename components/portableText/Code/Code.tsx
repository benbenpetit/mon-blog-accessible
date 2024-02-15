import { FC } from 'react'
import styles from './Code.module.scss'
import Refractor from 'react-refractor'
import jsx from 'refractor/lang/jsx'
import js from 'refractor/lang/javascript'

Refractor.registerLanguage(jsx)
Refractor.registerLanguage(js)

const Code: FC<any> = (props) => {
  const { language, code, highlightedLines } = props.props

  return (
    <Refractor
      className={styles.wrapper}
      language={language}
      value={code}
      markers={highlightedLines}
    />
  )
}

export default Code
