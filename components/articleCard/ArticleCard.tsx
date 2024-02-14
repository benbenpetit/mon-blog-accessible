'use client'
import React, { FC, useRef } from 'react'
import styles from './ArticleCard.module.scss'
import { IArticle } from '@/core/types/IArticle'
import Link from 'next/link'
import gsap from 'gsap'
import useIsomorphicLayoutEffect from '@/core/utils/useIsomorphicLayoutEffect'
import Image from 'next/image'
import { ScrollTrigger } from 'gsap/all'

interface Props {
  article: IArticle
  href: string
  eager?: boolean
}

const ArticleCard: FC<Props> = ({ article, href, eager }) => {
  const coverFilterRef = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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

    return () => ctx.revert()
  }, [])

  return (
    <Link
      className={styles.article}
      href={href}
      aria-description={article.title}
    >
      <div className={styles.article__wrapper}>
        <div className={styles.article__cover}>
          <span
            className={styles.article__cover__filter}
            ref={coverFilterRef}
            aria-hidden
          />
          <Image
            src={article.cover}
            alt={article.coverAlt}
            loading={eager ? 'eager' : 'lazy'}
            priority={eager}
            width={1600}
            height={900}
            sizes="(max-width: 480px) 75vw, (max-width: 768px) 85vw, 100vw"
          />
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

export default ArticleCard
