import { ITag } from '@/app/core/types/ITag'

export interface IArticle {
  _id: string
  title: string
  publishedAt: Date
  cover: string
  coverAlt: string
  body: any
  slug: string
  tags: ITag[]
}
