import { NextPage } from 'next'
import styles from './home.module.scss'
import { IArticle } from '@/core/types/IArticle'
import { groq } from 'next-sanity'
import * as queries from '@/core/sanity/queries'
import { client } from '@/core/lib/sanity'
import ArticlesList from '@/components/articlesList/ArticlesList'

const Home: NextPage = async () => {
  const data = await getData()

  return (
    <main className={styles.main}>
      <h1>Mon&nbsp;&nbsp;blog accessible</h1>
      <section className={styles.wrapper}>
        <ArticlesList articles={data.articles} />
      </section>
    </main>
  )
}

export default Home

export const revalidate = 60

async function getData() {
  const query = groq`
    *[_type == 'article'] | order(publishedAt asc) {
      ${queries.article}
    }
  `

  const articles: IArticle[] = await client.fetch(query)

  return {
    articles,
  }
}
