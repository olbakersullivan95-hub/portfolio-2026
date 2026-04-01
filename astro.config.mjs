import { defineConfig } from 'astro/config';

export default defineConfig({
  // Images are optimized via Astro's built-in <Image /> component
  image: {
    // Enable sharp for image optimization
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
