import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import customStructure from './customStructure'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'mon-blog-accessible',

  projectId: '0s2izsp8',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: customStructure,
    }),
    visionTool(),
    simplerColorInput({
      defaultColorFormat: 'rgba',
      defaultColorList: [
        { label: 'Light', value: '#ffffff' },
        { label: 'Dark', value: '#333333' },
        { label: 'Brand', value: '#ca786d' },
        { label: 'Accent', value: '#626754' },
        { label: 'Custom...', value: 'custom' },
      ],
    }),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
