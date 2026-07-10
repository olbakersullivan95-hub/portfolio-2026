import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    employer: z.string(),
    period: z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.enum(['UX', 'Brand', 'Product', 'Photography', 'Painting', 'Video', 'Animation', 'Writing'])),
    coverImage: z.string(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    opener: z.string().optional(),
    order: z.number(),
    // ── v1 content fields (legacy, optional) ──
    intro: z.string().optional(),
    bulletHeading: z.string().optional(),
    bulletPoints: z.array(z.string()).optional(),
    conclusionHeading: z.string().optional(),
    conclusion: z.string().optional(),
    // ── v2 content fields (new narrative structure) ──
    skills: z.array(z.string()).optional(),
    metaRow: z.object({
      role: z.string(),
      team: z.string(),
      scope: z.string(),
    }).optional(),
    problem: z.string().optional(),
    theMoment: z.string().optional(),
    whatICarryForward: z.string().optional(),
    arcDiagram: z.string().optional(),
    promptExample: z.string().optional(),
    // ── shared ──
    testimonial: z.object({
      quote: z.string(),
      attribution: z.string(),
    }).optional(),
    liveUrl: z.string().optional(),
  }),
});

export const collections = { projects };
