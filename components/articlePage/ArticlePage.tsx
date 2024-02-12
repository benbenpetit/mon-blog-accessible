'use client'
import { IArticle } from '@/core/types/IArticle'
import React, { FC, useRef } from 'react'
import styles from './ArticlePage.module.scss'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Work_Sans } from 'next/font/google'
import clsx from 'clsx'
import Link from 'next/link'
import useIsomorphicLayoutEffect from '@/core/utils/useIsomorphicLayoutEffect'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useLenis } from '@studio-freight/react-lenis'

const workSans = Work_Sans({
  weight: '400',
  subsets: ['latin'],
})

interface Props {
  article: IArticle
  prevSlug?: string
  nextSlug?: string
}

const ArticlePage: FC<Props> = ({ article, prevSlug = '', nextSlug = '' }) => {
  const lenis = useLenis()
  const pageRef = useRef<HTMLDivElement | null>(null)
  const navWrapperRef = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const getVMin = (coef: number) => {
      console.log('aaaalllloooo')
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

    let timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          scrub: true,
          start: `bottom-=${getHeight() - getVMin(12) - getVMin(14)} bottom`,
          end: `bottom bottom`,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        navWrapperRef.current,
        {
          height: getVMin(14),
          maxWidth: 1440,
        },
        {
          height: getHeight() - getVMin(12),
          maxWidth: '100%',
          ease: 'none',
        }
      )

    window.addEventListener('resize', () => {
      timeline.kill()
      timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: pageRef.current,
            scrub: true,
            start: `bottom-=${getHeight() - getVMin(12) - getVMin(14)} bottom`,
            end: `bottom bottom`,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          navWrapperRef.current,
          {
            height: getVMin(14),
            maxWidth: 1440,
          },
          {
            height: getHeight() - getVMin(12),
            maxWidth: '100%',
            ease: 'none',
          }
        )
    })

    return () => {
      timeline.kill()
      window.removeEventListener('resize', () => {
        timeline.kill()
      })
    }
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
            height={500}
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
          {[
            {
              slug: prevSlug,
              label: 'Précédent',
              ariaLabel: `Visiter l'article précédent`,
            },
            {
              slug: nextSlug,
              label: 'Suivant',
              ariaLabel: `Visiter l'article suivant`,
            },
          ].map((item) => {
            const isSlug = !!item.slug
            return (
              <Link
                key={item.slug}
                href={isSlug ? `/article/${item.slug}` : '/'}
                className={clsx(!isSlug && styles.disabled)}
                aria-disabled={!isSlug}
                aria-label={item.ariaLabel}
                tabIndex={isSlug ? undefined : -1}
                onFocus={(e) => {
                  lenis.scrollTo(document.body.scrollHeight)
                }}
              >
                {!isSlug && (
                  <div className={styles.rubalise} aria-hidden>
                    {[
                      { rotate: -22, translate: { x: 10, y: 15 } },
                      { rotate: -5, translate: { x: 10, y: -20 } },
                      { rotate: 20, translate: { x: -15, y: 10 } },
                    ].map((rubalise, i) => {
                      return (
                        <div
                          key={i}
                          className={styles.rubalise__inside}
                          style={{
                            transform: `translate(${
                              rubalise.translate.x - 50
                            }%, ${rubalise.translate.y - 50}%) rotate(${
                              rubalise.rotate
                            }deg)`,
                          }}
                        >
                          {[...Array(16)].map((_, i) => (
                            <span key={i} />
                          ))}
                        </div>
                      )
                    })}
                  </div>
                )}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ArticlePage
