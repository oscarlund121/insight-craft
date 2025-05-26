import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import resource from './schemaTypes/resource'

export default defineConfig({
  name: 'default',
  title: 'insight-craft',

  projectId: 'd73dgj5d',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [resource],
  },
})
