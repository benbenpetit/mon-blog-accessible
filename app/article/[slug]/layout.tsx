import { groq } from 'next-sanity'
import * as queries from '@/core/sanity/queries'
import { IArticle } from '@/core/types/IArticle'
import { client } from '@/core/lib/sanity'
import ArticlePage from '@/app/article/[slug]/page'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: {
    slug: string
  }
}

export default async function Layout({ params }: Props) {
  const data = await getData(params.slug)

  return (
    <>
      <ArticlePage
        article={data.current}
        prevSlug={data.prevSlug}
        nextSlug={data.nextSlug}
      />
    </>
  )
}

export const revalidate = 60

async function getData(slug: string) {
  const query = groq`
    *[_type == 'article' && slug.current == '${slug}']{
      "currentArticle": { 
        ${queries.article}
      },
      "prevArticle": *[_type == 'article' && ^.publishedAt > publishedAt] | order(publishedAt desc)[0] { 
        "slug": slug.current,
      },
      "nextArticle": *[_type == 'article' && ^.publishedAt < publishedAt] | order(publishedAt asc)[0] { 
        "slug": slug.current,
      },
    } | order(publishedAt)[0]
  `

  const data: {
    currentArticle: IArticle
    prevArticle?: {
      slug: string
    }
    nextArticle?: {
      slug: string
    }
  } = await client.fetch(query)

  return {
    current: data.currentArticle,
    prevSlug: data.prevArticle?.slug,
    nextSlug: data.nextArticle?.slug,
  }
}
