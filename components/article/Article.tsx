import React, { FC, forwardRef } from 'react'
import styles from './Article.module.scss'
import { IArticle } from '@/core/types/IArticle'
import Link from 'next/link'

interface Props {
  article: IArticle
  href: string
}

const Article = forwardRef<HTMLAnchorElement, Props>(
  ({ article, href }, ref) => {
    return (
      <Link className={styles.article} href={href} ref={ref}>
        <div className={styles.article__wrapper}>
          <img
            className={styles.article__cover}
            src={article.cover}
            alt={article.coverAlt}
          />
          <div className={styles.article__title}>
            <h2 className={styles.article__title__inside}>{article.title}</h2>
          </div>
          {/* <ul>
        {article.tags.map((tag) => (
          <li key={tag._id}>{tag.name}</li>
        ))}
      </ul> */}
        </div>
      </Link>
    )
  }
)

export default Article
