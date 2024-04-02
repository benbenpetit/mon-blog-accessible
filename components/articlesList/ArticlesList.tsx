'use client'
import { IArticle } from '@/core/types/IArticle'
import React, { FC, useLayoutEffect, useRef } from 'react'
import styles from './ArticlesList.module.scss'
import ArticleCard from '@/components/articleCard/ArticleCard'
import { useLenis } from '@/components/LenisWrapper'

interface Props {
  articles: IArticle[]
}

const ArticlesList: FC<Props> = ({ articles }) => {
  const lenis = useLenis()
  const containerRef = useRef<HTMLUListElement | null>(null)
  const articleRefs = useRef<Map<any, any> | null>(null)

  const startGsapAnim = async () => {
    const gsap = (await import('gsap')).default
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      const map = getMap()
      for (let i = 0; i < articles.length; i++) {
        const node = map.get(i)
        const normalizedIndex = i / articles.length
        mm.add('(min-width: 768px)', () => {
          gsap.to(node, {
            scrollTrigger: {
              trigger: node,
              scrub: true,
              start: 'top-=6%',
              end: 'bottom+=10%',
            },
            y: `${-3 + normalizedIndex * 3}vh`,
            scale: 0.88 + normalizedIndex * 0.12,
            filter: `blur(2px)`,
            ease: 'none',
          })
        })
      }
    })

    return () => ctx.revert()
  }

  useLayoutEffect(() => {
    startGsapAnim()
  }, [])

  const getVmin = () => {
    return Math.min(window.innerWidth, window.innerHeight) / 100
  }

  const handleOnFocus = (index: number) => {
    const itemMargin = getVmin() * 5
    const containerOffsetTop = containerRef.current?.offsetTop ?? 290
    const containerHeight =
      ((containerRef.current?.offsetHeight ?? 0) + itemMargin) / articles.length
    lenis?.scrollTo(containerOffsetTop + containerHeight * index, {
      immediate: true,
    })
  }

  const getMap = () => {
    if (!articleRefs.current) {
      articleRefs.current = new Map()
    }
    return articleRefs.current
  }

  return (
    <ul className={styles.articlesList} ref={containerRef}>
      {articles.map((article, index) => (
        <li
          key={article._id}
          className={styles.articlesList__item}
          ref={(node) => {
            const map = getMap()
            if (node) {
              map.set(index, node)
            } else {
              map.delete(index)
            }
          }}
        >
          <ArticleCard
            article={article}
            href={`/article/${article.slug}`}
            eager={index === 0}
            onFocus={() => handleOnFocus(index)}
          />
        </li>
      ))}
    </ul>
  )
}

export default ArticlesList
