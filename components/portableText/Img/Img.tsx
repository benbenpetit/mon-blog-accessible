import React, { FC } from 'react'
import styles from './Img.module.scss'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/core/lib/sanity'

interface Props {
  value: any
}

const Img: FC<Props> = ({ value }) => {
  const urlFor = (source: any) => {
    return imageUrlBuilder(client).image(source)
  }

  return (
    <>
      {value?.asset && (
        <Image
          className={styles.img}
          src={urlFor(value).url()}
          alt=""
          width={800}
          height={500}
          sizes="(max-width: 480px) 85vw, (max-width: 800px) 100vw, 800px"
        />
      )}
    </>
  )
}

export default Img
