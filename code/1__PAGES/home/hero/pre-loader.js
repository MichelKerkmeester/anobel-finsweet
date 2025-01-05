// Hero
// Pre-loader

// Initial setup
function initializeHeroStates() {
  const vw = window.innerWidth;
  const isDesktop = vw >= 992;
  const isTablet = vw >= 768 && vw < 992;

  gsap.set('.hero--content', {
    opacity: 0,
    y: '100%',
    scale: 0.95,
  });

  // Set different initial heights based on device
  gsap.set('.hero--section.is--home', {
    height: () => {
      if (isDesktop) return '100svh';
      if (isTablet) return '92.5svh';
      return '90svh'; // Mobile
    },
  });

  gsap.set('.page--wrapper > *', {
    opacity: 0,
  });

  // Initialize any text elements within hero content
  gsap.set('.hero--content h1, .hero--content p, .hero--content .button', {
    opacity: 0,
    y: '30px',
  });

  // Set border radius for .hero--video-w with transform isolation
  gsap.set('.hero--video-w', {
    borderRadius: '1rem',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  });
}

// Main animation timeline
function playHeroIntro() {
  const vw = window.innerWidth;
  const isDesktop = vw >= 992;
  const isTablet = vw >= 768 && vw < 992;

  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
  });

  // Set initial state of video with transform isolation
  tl.set('.hero--video-w', {
    borderRadius: '1rem',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  })
    // Change from .page--wrapper to .page--wrapper > *
    .to('.page--wrapper > *', {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.inOut',
    })

    // Animate hero section height with bounce
    .to(
      '.hero--section.is--home',
      {
        height: () => {
          if (isDesktop) return '80svh';
          if (isTablet) return '75svh';
          return '70svh'; // Mobile
        },
        duration: 1.8,
        ease: 'power4.inOut',
      },
      '-=0.8'
    )

    // Animate hero content with scale
    .to(
      '.hero--content',
      {
        opacity: 1,
        y: '0%',
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      },
      '-=0.9'
    )

    // Stagger animate text elements
    .to(
      '.hero--content h1, .hero--content p, .hero--content .button',
      {
        opacity: 1,
        y: '0',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      },
      '-=0.8'
    );

  // Ensure border radius stays after animation
  tl.set('.hero--video-w', {
    borderRadius: '1rem',
  });

  return tl;
}

// Initialize and play animation when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  initializeHeroStates();
  playHeroIntro();
});
