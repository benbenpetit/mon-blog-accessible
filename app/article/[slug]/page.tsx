'use client'
import { IArticle } from '@/core/types/IArticle'
import { NextPage } from 'next'
import React, { useRef } from 'react'
import styles from './articlePage.module.scss'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Work_Sans } from 'next/font/google'
import clsx from 'clsx'
import Link from 'next/link'
import useIsomorphicLayoutEffect from '@/core/utils/useIsomorphicLayoutEffect'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

interface Props {
  article: IArticle
}

const workSans = Work_Sans({
  weight: '400',
  subsets: ['latin'],
})

const ArticlePage: NextPage<Props> = ({ article }) => {
  const pageRef = useRef<HTMLDivElement | null>(null)
  const navWrapperRef = useRef<HTMLDivElement | null>(null)

  const getVMin = (coef: number) => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    )
    return (Math.min(vw, vh) / 100) * coef
  }

  const getHeight = () => {
    // get clamp(20vh, 80vw, 70vh) in javascript
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    )
    return Math.min(vh * 0.7, Math.max(vw * 0.8, vh * 0.2))
  }

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navWrapperRef.current,
        {
          height: getVMin(14),
          maxWidth: 1440,
        },
        {
          scrollTrigger: {
            trigger: pageRef.current,
            scrub: true,
            start: `bottom-=${getHeight() - getVMin(12) - getVMin(14)} bottom`,
            end: `bottom bottom`,
          },
          height: getHeight() - getVMin(12),
          maxWidth: '100%',
          ease: 'none',
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.articlePage} ref={pageRef}>
      <div className={styles.articlePage__wrapper}>
        <div className={styles.articlePage__cover}>
          <span className={styles.articlePage__cover__filter} />
          <Image
            src={article.cover}
            alt={article.coverAlt}
            width={1440}
            height={800}
          />
        </div>
        <div className={styles.articlePage__content}>
          <h1>{article.title}</h1>
          <div
            className={clsx(
              workSans.className,
              styles.articlePage__content__body
            )}
          >
            <PortableText value={article.body} />
          </div>
        </div>
      </div>
      <div className={styles.articlePage__nav}>
        <div className={styles.articlePage__nav__wrapper} ref={navWrapperRef}>
          <Link href={'#'}>
            <span>Précédent</span>
          </Link>
          <Link href={'#'}>
            <span>Suivant</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
