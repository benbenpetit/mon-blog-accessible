import BulletList from '@/components/portableText/BulletList/BulletList'
import Code from '@/components/portableText/Code/Code'
import Highlight from '@/components/portableText/Highlight/Highlight'
import Img from '@/components/portableText/Img/Img'
import Link from '@/components/portableText/Link/Link'
import Normal from '@/components/portableText/Normal/Normal'
import { PortableTextComponents } from '@portabletext/react'
import React from 'react'

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Normal>{children}</Normal>,
  },
  list: {
    bullet: ({ children }) => <BulletList>{children}</BulletList>,
  },
  types: {
    image: ({ value }) => <Img value={value} />,
    code: ({ value }) => <Code props={value} />,
  },
  marks: {
    highlight: ({ children }) => <Highlight>{children}</Highlight>,
    link: ({ children, value }) => <Link value={value}>{children}</Link>,
  },
}

export default portableTextComponents
