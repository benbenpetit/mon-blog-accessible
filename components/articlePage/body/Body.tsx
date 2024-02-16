import portableTextComponents from '@/components/portableText/PortableTextComponents'
import { PortableText } from '@portabletext/react'
import React, { FC } from 'react'

interface Props {
  content: any
}

const Body: FC<Props> = ({ content }) => {
  return <PortableText value={content} components={portableTextComponents} />
}

export default Body
