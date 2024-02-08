import { ITag } from '@/core/types/ITag'
import React, { FC } from 'react'

interface Props {
  tag: ITag
}

const Tag: FC<Props> = ({ tag }) => {
  return <div>Tag</div>
}

export default Tag
