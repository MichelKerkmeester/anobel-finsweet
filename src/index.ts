// Initialize Flowplay with hover source switching
function initBackgroundVideo() {
  const options = {
    selector: '[f-data-video="video-element"]',
    background: true,
    scaling: 'fill',
    ratio: '16:9',
    quality: {
      default: '1080p',
      force: false,
      switching: true,
      switchSpeed: 'auto',
    },
    loop: true,
    autoplay: true,
    playsinline: true,
    muted: true,
  };

  // Initialize Flowplay
  // @ts-ignore
  let player;
  if (typeof Flowplay !== 'undefined') {
    // @ts-ignore
    player = new Flowplay(options);
  }

  // Handle hover source switching
  const triggers = document.querySelectorAll('[data-hover-video]');
  triggers.forEach((trigger) => {
    trigger.addEventListener('mouseenter', () => {
      const videoSrc = trigger.getAttribute('data-hover-video');
      if (videoSrc && player) {
        const videoElement = document.querySelector('.video-player-style');
        videoElement?.classList.add('loading');

        player.loadVideo(videoSrc).then(() => {
          videoElement?.classList.remove('loading');
        });
      }
    });

    // Optional: Return to default video on mouse leave
    trigger.addEventListener('mouseleave', () => {
      if (player) {
        player.loadVideo('default-video.mp4'); // Your default video
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initBackgroundVideo);
