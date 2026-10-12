document.addEventListener('DOMContentLoaded', () => {
  const navItems = [...document.querySelectorAll('.menu li')];
  const sectionIds = ['home', 'services', 'about', 'gallery', 'contact'];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const footerYear = document.querySelector('.footer-year');
  const revealItems = document.querySelectorAll(
    '.Cards1, .Cards2, .Cards3, .services_box, .about_us_img, .Side_Text, .g1, .g2, .g3, .g4, .g5, .g6'
  );

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  navItems.forEach((item, index) => {
    const anchor = item.querySelector('a');
    if (!anchor) return;

    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const target = sections[index];

      navItems.forEach((navItem) => navItem.classList.remove('active'));
      item.classList.add('active');

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const activeIndex = sectionIds.indexOf(entry.target.id);
          if (activeIndex >= 0 && navItems[activeIndex]) {
            navItems.forEach((navItem) => navItem.classList.remove('active'));
            navItems[activeIndex].classList.add('active');
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18
      }
    );

    revealItems.forEach((item) => {
      item.classList.add('reveal');
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 20;
      header.classList.toggle('scrolled', scrolled);
    });
  }
});
