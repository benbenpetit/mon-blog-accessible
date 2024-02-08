'use client'
import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react'
import styles from './Article.module.scss'
import { IArticle } from '@/core/types/IArticle'
import Link from 'next/link'
import gsap from 'gsap'

interface Props {
  article: IArticle
  href: string
}

const Article = forwardRef<HTMLAnchorElement, Props>(
  ({ article, href }, ref) => {
    const [isBaseSticky, setIsBaseSticky] = useState(false)
    const coverFilterRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          coverFilterRef.current,
          {
            opacity: 0.25,
          },
          {
            scrollTrigger: {
              trigger: coverFilterRef.current,
              scrub: true,
              start: 'top-=6%',
              end: 'bottom+=10%',
            },
            opacity: 0.4,
          }
        )
      })

      setTimeout(() => {
        setIsBaseSticky(true)
      }, 100)

      return () => ctx.revert()
    }, [])

    return (
      <Link
        className={styles.article}
        style={{ position: isBaseSticky ? 'sticky' : 'static' }}
        href={href}
        ref={ref}
      >
        <div className={styles.article__wrapper}>
          <div className={styles.article__cover}>
            <span
              className={styles.article__cover__filter}
              ref={coverFilterRef}
            />
            <img src={article.cover} alt={article.coverAlt} />
          </div>
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
