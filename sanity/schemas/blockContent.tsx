import { defineType } from 'sanity'

export default defineType({
  name: 'blockContent',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
      title: 'Block',
      marks: {
        decorators: [
          {
            title: 'Highlighted',
            value: 'highlight',
          },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
    },
    {
      type: 'code',
    },
  ],
})
