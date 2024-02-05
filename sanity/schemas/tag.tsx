import React from 'react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'simplerColor',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      color: 'color',
    },
    prepare(selection) {
      const { title, color } = selection

      return {
        title,
        media: (
          <div
            style={{
              backgroundColor: color.value,
              width: '100%',
              height: '100%',
            }}
          />
        ),
      }
    },
  },
})
