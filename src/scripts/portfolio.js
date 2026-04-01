/**
 * Portfolio interaction script
 * Handles grid → case study transition and carousel navigation
 * Uses History API for shareable URLs and working back button
 */

const portfolio = document.getElementById('portfolio');
const grid = document.getElementById('portfolio-grid');
const caseStudy = document.getElementById('case-study');
const caseStudyContent = document.getElementById('case-study-content');
const closeBtn = document.getElementById('case-study-close');
const carousel = document.getElementById('portfolio-carousel');
const carouselTrack = document.getElementById('carousel-track');

// On /work/index.astro: grid items are in the DOM, case study is empty
// On /work/[slug].astro: case study is pre-rendered, carousel is pre-rendered
// This script handles the client-side transitions for /work/index.astro

if (grid) {
  // Grid item click — transition to case study
  grid.addEventListener('click', async (e) => {
    const item = e.target.closest('.portfolio__item');
    if (!item) return;
    e.preventDefault();

    const slug = item.dataset.slug;
    await openCaseStudy(slug);
    history.pushState({ slug }, '', `/work/${slug}`);
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    closeToGrid();
    history.pushState({}, '', '/work');
  });
}

// Carousel item click — swap active case study without closing
if (carouselTrack) {
  carouselTrack.addEventListener('click', async (e) => {
    const item = e.target.closest('.carousel__item');
    if (!item) return;
    e.preventDefault();

    const slug = item.dataset.slug;
    await swapCaseStudy(slug);
    history.pushState({ slug }, '', `/work/${slug}`);
  });
}

// Back/forward browser buttons
window.addEventListener('popstate', async (e) => {
  if (e.state?.slug) {
    await openCaseStudy(e.state.slug);
  } else {
    closeToGrid();
  }
});

async function openCaseStudy(slug) {
  // Fetch case study content from the pre-rendered page
  const res = await fetch(`/work/${slug}`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const newContent = doc.getElementById('case-study-content');
  const newCarousel = doc.getElementById('carousel-track');

  if (newContent) caseStudyContent.innerHTML = newContent.innerHTML;
  if (newCarousel) carouselTrack.innerHTML = newCarousel.innerHTML;

  portfolio.dataset.state = 'expanded';
  caseStudy.setAttribute('aria-hidden', 'false');
  carousel.setAttribute('aria-hidden', 'false');

  // TODO: add GSAP transition here once design is finalised
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function swapCaseStudy(slug) {
  // Same as openCaseStudy but without re-triggering the full open animation
  const res = await fetch(`/work/${slug}`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const newContent = doc.getElementById('case-study-content');
  const newCarousel = doc.getElementById('carousel-track');

  if (newContent) caseStudyContent.innerHTML = newContent.innerHTML;
  if (newCarousel) carouselTrack.innerHTML = newCarousel.innerHTML;

  caseStudy.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeToGrid() {
  portfolio.dataset.state = 'grid';
  caseStudy.setAttribute('aria-hidden', 'true');
  carousel.setAttribute('aria-hidden', 'true');
  caseStudyContent.innerHTML = '';
  carouselTrack.innerHTML = '';

  // TODO: add GSAP transition here once design is finalised
}
