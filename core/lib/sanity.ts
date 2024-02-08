import { createClient } from 'next-sanity'

export const client = createClient({
  apiVersion: '2024-02-05',
  dataset: 'production',
  projectId: '0s2izsp8',
  useCdn: false,
})
