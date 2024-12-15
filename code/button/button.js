// Button
// Arrow animation
const btnAnimation = () => {
  // Select elements
  const buttons = document.querySelectorAll('.btn--cta');

  buttons.forEach((btn) => {
    const iconBase = btn.querySelector('.btn--icon.is--animated-base');
    const iconAbsolute = btn.querySelector('.btn--icon.is--animated-absolute');

    if (iconBase && iconAbsolute) {
      const timeline = gsap.timeline({ paused: true, reversed: true });

      // Define animation
      timeline
        .to(
          iconAbsolute,
          {
            x: '0%',
            duration: 0.3,
            ease: 'power1.out',
          },
          0
        )
        .to(
          iconBase,
          {
            x: '200%',
            duration: 0.3,
            ease: 'power0',
          },
          0
        )
        .to(
          iconBase,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power1.out',
          },
          '-=0.1'
        );

      // Event listeners
      btn.addEventListener('mouseenter', () => timeline.play());
      btn.addEventListener('mouseleave', () => timeline.reverse());
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  btnAnimation();
});
