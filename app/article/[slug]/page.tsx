import { client } from '@/core/lib/sanity'
import { IArticle } from '@/core/types/IArticle'
import { NextPage } from 'next'
import { groq } from 'next-sanity'
import React from 'react'
import * as queries from '@/core/sanity/queries'
import styles from './articlePage.module.scss'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Work_Sans } from 'next/font/google'
import clsx from 'clsx'

interface Props {
  params: {
    slug: string
  }
}

const workSans = Work_Sans({
  weight: '400',
  subsets: ['latin'],
})

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const data = await getData(params.slug)

  return (
    <div className={styles.articlePage}>
      <div className={styles.articlePage__wrapper}>
        <div className={styles.articlePage__cover}>
          <span className={styles.articlePage__cover__filter} />
          <Image
            src={data.article.cover}
            alt={data.article.coverAlt}
            width={1440}
            height={800}
          />
        </div>
        <div className={styles.articlePage__content}>
          <h1>{data.article.title}</h1>
          <div
            className={clsx(
              workSans.className,
              styles.articlePage__content__body
            )}
          >
            <PortableText value={data.article.body} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage

export const revalidate = 60

async function getData(slug: string) {
  const query = groq`
    *[_type == 'article' && slug.current == '${slug}'] | order(publishedAt asc) {
      ${queries.article}
    }[0]
  `

  const article: IArticle = await client.fetch(query)

  return {
    article,
  }
}
