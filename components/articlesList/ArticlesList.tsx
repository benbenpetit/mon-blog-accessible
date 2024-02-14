'use client'
import { IArticle } from '@/core/types/IArticle'
import React, { FC, useLayoutEffect, useState } from 'react'
import styles from './ArticlesList.module.scss'
import ArticleCard from '@/components/articleCard/ArticleCard'

interface Props {
  articles: IArticle[]
}

const ArticlesList: FC<Props> = ({ articles }) => {
  const [isBaseSticky, setIsBaseSticky] = useState(false)
  const articleRefs: any = articles.reduce((acc: any, _, index) => {
    acc[index] = React.createRef()
    return acc
  }, {})

  const startGsapAnim = async () => {
    const gsap = (await import('gsap')).default
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default

    gsap.registerPlugin(ScrollTrigger)

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
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsBaseSticky(true)
    }, 100)

    startGsapAnim()
  }, [articles, articleRefs])

  return (
    <ul className={styles.articlesList}>
      {articles.map((article, index) => (
        <li
          key={article._id}
          className={styles.articlesList__item}
          ref={articleRefs[index]}
          style={{ position: isBaseSticky ? 'sticky' : 'static' }}
        >
          <ArticleCard
            article={article}
            href={`/article/${article.slug}`}
            eager={index === 0}
          />
        </li>
      ))}
    </ul>
  )
}

export default ArticlesList
