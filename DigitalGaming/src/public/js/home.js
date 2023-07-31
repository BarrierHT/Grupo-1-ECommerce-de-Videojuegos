const videoElement = document.querySelector('.video_main');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const sectionHeight = document.querySelector('.home-section').offsetHeight;
  if (scrollPosition >= sectionHeight) {
    videoElement.style.position = 'absolute';
    videoElement.style.top = 'auto';
    videoElement.style.bottom = '0';
  } else {
    videoElement.style.position = 'fixed';
    videoElement.style.top = '0';
    videoElement.style.bottom = 'auto';
  }
});
