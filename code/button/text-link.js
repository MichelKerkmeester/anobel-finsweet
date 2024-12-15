// Text link
// Animate line on Hover
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    // Only select elements with data-text-link-hover="underline"
    document
      .querySelectorAll('.btn--text-link-hover[data-text-link-hover="underline"]')
      .forEach(function (el) {
        el.style.width = '0%';
        el.style.visibility = 'hidden'; // Initially hide the line
      });

    document
      .querySelectorAll('.btn--text-link[data-text-link-hover="underline"]')
      .forEach(function (link) {
        link.addEventListener('mouseenter', function () {
          // Mouse enter animation
          gsap.to(link.querySelector('.btn--text-link-hover'), {
            duration: 0.3,
            width: '100%',
            visibility: 'visible',
            ease: 'power1.out',
          });
        });

        link.addEventListener('mouseleave', function () {
          // Mouse leave animation
          gsap.to(link.querySelector('.btn--text-link-hover'), {
            duration: 0.3,
            width: '0%',
            ease: 'power1.out',
          });
        });
      });
  });
}
