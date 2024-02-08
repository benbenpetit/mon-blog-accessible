import { groq } from 'next-sanity'

export const tag = groq`
  _id,
  "slug": slug.current,
  name,
  color,
`

export const article = groq`
  _id,
  "slug": slug.current,
  title,
  publishedAt,
  "cover": mainImage.asset->url,
  "coverAlt": altImage,
  body,
  "tags": tags[]-> {
    ${tag}
  }
`
