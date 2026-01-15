import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      initialValue: { current: 'about' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'object',
      fields: [
        defineField({
          name: 'heading1',
          title: 'Heading 1',
          type: 'string',
        }),
        defineField({
          name: 'heading2',
          title: 'Heading 2',
          type: 'string',
        }),
        defineField({
          name: 'heading3',
          title: 'Heading 3',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'video',
          title: 'Intro Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        }),
      ],
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'value',
          fields: [
            defineField({
              name: 'title',
              title: 'Value Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'members',
          title: 'Team Members',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'teamMember',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                }),
                defineField({
                  name: 'role',
                  title: 'Role',
                  type: 'string',
                }),
                defineField({
                  name: 'bio',
                  title: 'Bio',
                  type: 'text',
                }),
                defineField({
                  name: 'image',
                  title: 'Photo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});

