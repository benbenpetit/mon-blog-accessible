'use client'
import { IArticle } from '@/core/types/IArticle'
import React, { FC, useLayoutEffect } from 'react'
import styles from './ArticlesList.module.scss'
import Article from '@/components/article/Article'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

interface Props {
  articles: IArticle[]
}

const ArticlesList: FC<Props> = ({ articles }) => {
  const articleRefs: any = articles.reduce((acc: any, _, index) => {
    acc[index] = React.createRef()
    return acc
  }, {})

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      for (let i = 0; i < articles.length; i++) {
        const normalizedIndex = i / articles.length
        mm.add('(min-width: 768px)', () => {
          gsap.to(articleRefs[i].current, {
            scrollTrigger: {
              trigger: articleRefs[i].current,
              scrub: true,
              start: 'top-=6%',
              end: 'bottom+=10%',
            },
            y: `${-3 + normalizedIndex * 3}vh`,
            scale: 0.9 + normalizedIndex * 0.15,
            filter: `blur(2px)`,
            ease: 'none',
          })
        })
      }
    })

    return () => ctx.revert()
  }, [articles, articleRefs])

  return (
    <ul className={styles.articlesList}>
      {articles.map((article, index) => (
        <Article
          key={article._id}
          article={article}
          href={`/article/${article.slug}`}
          ref={articleRefs[index]}
        />
      ))}
    </ul>
  )
}

export default ArticlesList
