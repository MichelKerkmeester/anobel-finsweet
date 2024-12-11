// Button
// Arrow animation
const btnAnimation = () => {
  // Select elements
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((btn) => {
    const hoverElement = btn.querySelector('#btn--interaction');
    const textElement = btn.querySelector('.btn--text');

    if (hoverElement && textElement) {
      const timeline = gsap.timeline({ paused: true, reversed: true });

      // Define animation
      timeline
        .to(
          textElement,
          {
            x: '1rem',
            duration: 0.15,
            ease: 'power1.out',
          },
          0
        )
        .to(
          hoverElement,
          {
            x: '200%',
            duration: 0.2,
            ease: 'power0',
          },
          '-=0.2'
        )
        .to(
          hoverElement,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power1.out',
          },
          '-=0.15'
        );

      // Event listeners
      btn.addEventListener('mouseenter', () => {
        if (timeline.reversed()) {
          timeline.play();
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (!timeline.reversed()) {
          timeline.reverse();
        }
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  btnAnimation();
});
