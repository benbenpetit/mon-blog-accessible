import { getPlaiceholder } from 'plaiceholder'

const getBlurData = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  )

  const data = await getPlaiceholder(buffer)
  return data
}

export default getBlurData
