import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://oliviabakersullivan.ca',
  // Images are optimized via Astro's built-in <Image /> component
  image: {
    // Enable sharp for image optimization
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  // /work moved to /portfolio — keep old links/bookmarks working
  redirects: {
    '/work': '/portfolio',
    '/work/sandbox': '/portfolio/sandbox',
    '/work/[slug]': '/portfolio/[slug]',
  },
});
