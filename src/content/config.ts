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
    order: z.number(),
    // Structured content — each section aligns with its corresponding image
    intro: z.string(),                    // aligns with images[0]
    bulletHeading: z.string(),            // heading for the "What I Did" section
    bulletPoints: z.array(z.string()),    // aligns with images[1]
    conclusionHeading: z.string(),        // heading for the closing section
    conclusion: z.string(),              // aligns with images[2]
    testimonial: z.object({
      quote: z.string(),
      attribution: z.string(),
    }).optional(),
    liveUrl: z.string().optional(),
  }),
});

export const collections = { projects };
