import { defineField, defineType } from 'sanity'
import React from 'react'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'altImage',
      title: 'Alt image',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      cover: 'mainImage.asset.url',
      alt: 'altImage',
      tagName0: 'tags.0.name',
      tagName1: 'tags.1.name',
      tagName2: 'tags.2.name',
    },
    prepare(selection) {
      const { title, cover, alt, tagName0, tagName1, tagName2 } = selection
      const filteredTags = [tagName0, tagName1, tagName2].filter(Boolean)

      return {
        title,
        subtitle: filteredTags.length > 0 ? filteredTags.join(' | ') : 'No tag',
        media: (
          <img
            src={cover || 'https://via.placeholder.com/150'}
            alt={alt}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ),
      }
    },
  },
})
