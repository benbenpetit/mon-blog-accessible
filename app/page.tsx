import { NextPage } from 'next'
import styles from './home.module.scss'
import { IArticle } from '@/app/core/types/IArticle'
import Article from '@/app/components/article/Article'
import { groq } from 'next-sanity'
import * as queries from '@/app/core/sanity/queries'
import { client } from '@/app/core/lib/sanity'
import Link from 'next/link'

const Home: NextPage = async () => {
  const data = await getData()

  return (
    <main className={styles.main}>
      <h1>Mon blog accessible</h1>
      <section className={styles.wrapper}>
        <ul>
          {data.articles.map((article) => (
            <Link key={article._id} href={`/article/${article.slug}`}>
              <Article article={article} />
            </Link>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Home

async function getData() {
  const query = groq`
    *[_type == 'article'] | order(publishedAt desc) {
      ${queries.article}
    }
  `

  const articles: IArticle[] = await client.fetch(query)

  return {
    articles,
  }
}
