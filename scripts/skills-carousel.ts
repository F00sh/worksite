export function initSkillsCarousel() {
  // find the <img id="project-slide"> that was injected from skills.html

  const img = document.querySelector('#projects #project-slide') as HTMLImageElement | null;
  if (!img) return;
  // partial not yet in DOM

  const slides = [
    'https://picsum.photos/900/600?random=1',
    'https://picsum.photos/900/600?random=2',
    'https://picsum.photos/900/600?random=3',
    'https://picsum.photos/900/600?random=4'
  ];

  let i = 0;
  setInterval(() => {
    i = (i + 1) % slides.length;
    img.classList.add('opacity-0');      // fade-out
    setTimeout(() => {
      img.src = slides[i];               // swap image
      img.classList.remove('opacity-0'); // fade-in
    }, 400);
  }, 4000);
}
