import React, { FC } from 'react'
import styles from './Article.module.scss'
import { IArticle } from '@/app/core/types/IArticle'
import { PortableText } from '@portabletext/react'

interface Props {
  article: IArticle
}

const Article: FC<Props> = ({ article }) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.container__cover}
        src={article.cover}
        alt={article.coverAlt}
      />
      <h2 className={styles.container__title}>{article.title}</h2>
      <div className={styles.container__description}>
        <PortableText value={article.body} />
      </div>
      {/* <ul>
        {article.tags.map((tag) => (
          <li key={tag._id}>{tag.name}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default Article
