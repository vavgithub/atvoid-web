import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
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
      initialValue: { current: 'home' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      description:
        'Experience badge, intro, and trusted-by logos (top of home page, above the showreel).',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundVideoUrl',
          title: 'Hero background video (URL)',
          description:
            'Optional. MP4 (or other) URL shown centered on top of the static hero background image. Example: Framer CDN or your own host.',
          type: 'url',
        }),
        defineField({
          name: 'experienceBadge',
          title: 'Experience Badge',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Badge Icon',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'description',
              title: 'Description Text',
              description:
                'e.g., "AWARD-WINNING STUDIO WITH OVER 20 YEARS OF EXPERIENCE WORLDWIDE"',
              type: 'text',
            }),
          ],
        }),
        defineField({
          name: 'intro',
          title: 'Introduction',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Main Heading',
              description:
                'Multi-line heading (e.g., "STRATEGIC BRANDING. ROBUST ENGINEERING. ONE COHERENT VISION.")',
              type: 'text',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              description: 'Right column text (can be multiple paragraphs)',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        }),
        defineField({
          name: 'trustedBy',
          title: 'Trusted By',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              description:
                'e.g., "TRUSTED BY GLOBAL INNOVATORS & FORTUNE 100 LEADERS"',
              type: 'string',
            }),
            defineField({
              name: 'logos',
              title: 'Brand Logos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'brandLogo',
                  fields: [
                    defineField({
                      name: 'image',
                      title: 'Logo Image',
                      type: 'image',
                      options: { hotspot: true },
                    }),
                    defineField({
                      name: 'altText',
                      title: 'Alt Text',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'showReelsSection',
      title: 'ShowReels Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Thumbnail',
          description: 'Optional still used as the video poster (and shown if no video is set).',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'video',
          title: 'Showreel video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
        }),
      ],
    }),
    defineField({
      name: 'awardWinningStudio',
      title: 'Award winning Studio',
      type: 'object',
      fields: [
        defineField({
          name: 'messageSection',
          title: 'Message Section',
          type: 'object',
          fields: [
            defineField({
              name: 'textContent',
              title: 'Text Content (Left Side)',
              type: 'object',
              fields: [
                defineField({
                  name: 'backgroundText',
                  title: 'Large Background Image',
                  description: 'Large faded text image (e.g., "STOP FRAGMENTING YOUR BRAND")',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({
                  name: 'paragraph1',
                  title: 'Paragraph 1',
                  description: 'First overlaying paragraph',
                  type: 'text',
                }),
                defineField({
                  name: 'paragraph2',
                  title: 'Paragraph 2',
                  description: 'Second overlaying paragraph',
                  type: 'text',
                }),
                defineField({
                  name: 'concludingStatement',
                  title: 'Concluding Statement',
                  description: 'e.g., "At Value at Void, we are the single source of truth."',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'image',
              title: 'Right Side Image',
              description: 'Abstract 3D graphic/image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'digitalEcosystem',
      title: 'Digital Ecosystem Section',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          description: 'Single image: gradients + all shapes (wireframe globe, chevrons, pink shapes).',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'mainHeading',
          title: 'Main Heading',
          description: 'e.g. "A COMPLETE DIGITAL ECOSYSTEM"',
          type: 'string',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          description: 'Two-line subheading below the main heading.',
          type: 'object',
          fields: [
            defineField({
              name: 'line1',
              title: 'Line 1',
              type: 'string',
            }),
            defineField({
              name: 'line2',
              title: 'Line 2',
              type: 'string',
            }),
          ],
        }),

        defineField({
          name: 'categories',
          title: 'Categories (Brand / Experience / Engineering)',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'category',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  description: 'e.g. "BRAND", "EXPERIENCE", "ENGINEERING"',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  description: 'Optional. Used for the first column (e.g. BRAND).',
                  type: 'text',
                }),
                defineField({
                  name: 'style',
                  title: 'Style',
                  description: 'Prominent (white) vs Faded (grey).',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Prominent', value: 'prominent' },
                      { title: 'Faded', value: 'faded' },
                    ],
                  },
                  initialValue: 'prominent',
                }),
              ],
              preview: {
                select: { title: 'title' },
                prepare({ title }) {
                  return { title: title || 'Category' };
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(3),
        }),
        defineField({
          name: 'services',
          title: 'Service Labels',
          description: 'e.g. "3D & Motion Graphics", "Brand Identity", "UI/UX Design". Order = left, mid-right, lower-right.',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'serviceItem',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                }),
              ],
              preview: {
                select: { name: 'name' },
                prepare({ name }) {
                  return { title: name || 'Service' };
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'coherenceIsAlive',
      title: 'Coherence Is Alive',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Orb glow image',
          description: 'Bottom orb / glow graphic.',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'subline',
          title: 'Subline',
          type: 'string',
        }),
        defineField({
          name: 'line1',
          title: 'Line 1',
          type: 'string',
        }),
        defineField({
          name: 'items',
          title: 'Items',
          description: 'Image + label for each entry.',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'coherenceIsAliveItem',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                }),
              ],
              preview: {
                select: { label: 'label', media: 'image' },
                prepare({ label, media }) {
                  return { title: label || 'Item', media };
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'selectedWorks',
      title: 'Selected Works Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          description: 'e.g. "SELECTED WORKS"',
          type: 'string',
        }),
        defineField({
          name: 'cards',
          title: 'Project Cards',
          description:
            'Shown in the Selected Works horizontal scroll on the homepage. No fixed limit — add as many as you need.',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'workCard',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  description: 'e.g. "The Full Stack"',
                  type: 'string',
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({
                  name: 'client',
                  title: 'Client',
                  description: 'e.g. "SaaS"',
                  type: 'string',
                }),
                defineField({
                  name: 'scopeTags',
                  title: 'Scope Tags',
                  description: 'e.g. Strategy, UX, React Build. Set color per tag.',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'scopeTag',
                      fields: [
                        defineField({
                          name: 'name',
                          title: 'Tag Name',
                          type: 'string',
                        }),
                        defineField({
                          name: 'color',
                          title: 'Tag Color',
                          description:
                            'Enter a hex color like #73F8C3 (supports #RGB or #RRGGBB).',
                          type: 'string',
                          validation: (Rule) =>
                            Rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                              name: 'hex-color',
                              invert: false,
                            }).warning('Use a hex color like #73F8C3'),
                        }),
                      ],
                      preview: {
                        select: { name: 'name' },
                        prepare({ name }: { name?: string }) {
                          return { title: name || 'Tag' };
                        },
                      },
                    },
                  ],
                }),
                defineField({
                  name: 'narrative',
                  title: 'Narrative',
                  description: 'e.g. "From complex data to intuitive flow"',
                  type: 'string',
                }),
                defineField({
                  name: 'index',
                  title: 'Index',
                  description: 'e.g. "01", "02", "03"',
                  type: 'string',
                }),
                defineField({
                  name: 'href',
                  title: 'Card Link (optional)',
                  type: 'url',
                }),
              ],
              preview: {
                select: { title: 'title' },
                prepare({ title }: { title?: string }) {
                  return { title: title || 'Card' };
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'diverseTeam',
      title: 'Diverse Team Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'object',
          fields: [
            defineField({
              name: 'prefix1',
              title: 'Prefix 1',
              description: 'Small gray text (e.g., "WE ARE A")',
              type: 'string',
            }),
            defineField({
              name: 'main1',
              title: 'Main Text 1',
              description: 'Large white text (e.g., "DIVERSE TEAM")',
              type: 'string',
            }),
            defineField({
              name: 'prefix2',
              title: 'Prefix 2',
              description: 'Small gray text (e.g., "DISTRIBUTED ACROSS")',
              type: 'string',
            }),
            defineField({
              name: 'main2',
              title: 'Main Text 2',
              description: 'Large white text (e.g., "3 TIMEZONES")',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          description: 'World map background image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'arrowTarget',
          title: 'Arrow Target (Center Point)',
          description:
            'Arrows will point toward this target point (percent-based). Default is true center (50/50).',
          type: 'object',
          fields: [
            defineField({
              name: 'x',
              title: 'Target X (%)',
              type: 'number',
              initialValue: 50,
              validation: (Rule) => Rule.min(-100).max(200),
            }),
            defineField({
              name: 'y',
              title: 'Target Y (%)',
              type: 'number',
              initialValue: 50,
              validation: (Rule) => Rule.min(-100).max(200),
            }),
          ],
        }),
        defineField({
          name: 'teamMembers',
          title: 'Team Members',
          description: 'Add team members with their names, colors, and positions on the map',
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
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'color',
                  title: 'Speech Bubble Color',
                  description:
                    'Enter a hex color like #73F8C3 (supports #RGB or #RRGGBB).',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().regex(
                      /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
                      { name: 'hex-color' },
                    ),
                }),
                defineField({
                  name: 'positionX',
                  title: 'Position X (%)',
                  description: 'Horizontal position on the map (can be negative to position outside map boundaries)',
                  type: 'number',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'positionY',
                  title: 'Position Y (%)',
                  description: 'Vertical position on the map (can be negative to position outside map boundaries)',
                  type: 'number',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'arrowColor',
                  title: 'Arrow Color',
                  description: 'Optional. Cursor/arrow fill color. Defaults to the speech bubble color when empty.',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                      name: 'hex-color',
                    }).warning('Use a hex color like #111111'),
                }),
                defineField({
                  name: 'arrowPositionX',
                  title: 'Arrow Position X (%)',
                  description:
                    'Optional. Horizontal position of the arrow on the map (same % system as Position X). Leave empty to keep the arrow attached to the bottom-right of the name tag.',
                  type: 'number',
                }),
                defineField({
                  name: 'arrowPositionY',
                  title: 'Arrow Position Y (%)',
                  description:
                    'Optional. Vertical position of the arrow on the map (same % system as Position Y). Both Arrow Position X and Y must be set to use map positioning.',
                  type: 'number',
                }),
                defineField({
                  name: 'arrowRotationDeg',
                  title: 'Arrow Rotation (deg)',
                  description:
                    'Optional. Overrides auto-rotation. 0 = points right, 90 = down, -90 = up. Leave empty to auto-point to the Arrow Target.',
                  type: 'number',
                }),
              ],
              preview: {
                select: {
                  name: 'name',
                  color: 'color',
                },
                prepare({ name, color }: { name?: string; color?: string }) {
                  return {
                    title: name || 'Team Member',
                    subtitle: color ? `Color: ${color}` : '',
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(15),
        }),
      ],
    }),
    defineField({
      name: 'roiOfCoherence',
      title: 'ROI of Coherence Section',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          description: 'Dark abstract background with iridescent effects.',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          description: 'e.g. "The ROI of Coherence"',
          type: 'string',
        }),
        defineField({
          name: 'cards',
          title: 'Feature Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'featureCard',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Icon / Image',
                  type: 'image',
                  options: { hotspot: true },
                }),
                defineField({
                  name: 'heading',
                  title: 'Heading',
                  description: 'e.g. "SPEED TO MARKET"',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                }),
              ],
              preview: {
                select: { heading: 'heading' },
                prepare({ heading }: { heading?: string }) {
                  return { title: heading || 'Card' };
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          description: 'e.g. "READY TO BUILD YOUR DEFINITIVE BRAND?"',
          type: 'string',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          description: 'e.g. "DIRECT ACCESS TO PRINCIPALS. NO SALES REP."',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          description: 'Small paragraph below the subheading.',
          type: 'text',
        }),
        defineField({
          name: 'discoveryCall',
          title: 'Circular CTA (same as Hero)',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'e.g., "BOOK A DISCOVERY CALL NOW!"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link (URL)',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
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

