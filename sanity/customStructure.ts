import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Accessibility blog')
    .items([
      S.listItem()
        .title('Articles')
        .child(S.documentTypeList('article').title('Articles')),
      S.listItem().title('Tags').child(S.documentTypeList('tag').title('Tags')),
    ])

export default structure
