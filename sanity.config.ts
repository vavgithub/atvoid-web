import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Value at Void CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool({ structure })],
  basePath: '/admin',

  schema: {
    types: schemaTypes,
  },
});

