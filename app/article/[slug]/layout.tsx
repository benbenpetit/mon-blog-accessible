import { groq } from 'next-sanity'
import * as queries from '@/core/sanity/queries'
import { IArticle } from '@/core/types/IArticle'
import { client } from '@/core/lib/sanity'
import { ReactNode } from 'react'
import { LayoutProps } from '@/.next/types/app/layout'
import { NextPage } from 'next'
import ArticlePage from '@/app/article/[slug]/page'

const Layout: NextPage<LayoutProps> = async ({ params }) => {
  const data = await getData(params.slug)

  return (
    <>
      <ArticlePage article={data.article} />
    </>
  )
}

export default Layout

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
