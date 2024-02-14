'use client'
import React, { FC, useRef } from 'react'
import styles from './ArticleCard.module.scss'
import { IArticle } from '@/core/types/IArticle'
import Link from 'next/link'
import useIsomorphicLayoutEffect from '@/core/utils/useIsomorphicLayoutEffect'
import Image from 'next/image'

interface Props {
  article: IArticle
  href: string
  eager?: boolean
}

const ArticleCard: FC<Props> = ({ article, href, eager }) => {
  const coverFilterRef = useRef<HTMLDivElement | null>(null)

  const startGsapAnim = async () => {
    const gsap = (await import('gsap')).default
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).default

    gsap.registerPlugin(ScrollTrigger)

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
  }

  useIsomorphicLayoutEffect(() => {
    startGsapAnim()
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
