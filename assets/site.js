(() => {
  const root = document.documentElement;
  const body = document.body;
  const koButton = document.querySelector('[data-lang-button="ko"]');
  const enButton = document.querySelector('[data-lang-button="en"]');

  const setLanguage = (language) => {
    const lang = language === 'en' ? 'en' : 'ko';
    body.dataset.lang = lang;
    root.lang = lang;
    koButton?.setAttribute('aria-pressed', String(lang === 'ko'));
    enButton?.setAttribute('aria-pressed', String(lang === 'en'));
    try { localStorage.setItem('e2p-language', lang); } catch (_) {}
  };

  let savedLanguage = 'ko';
  try { savedLanguage = localStorage.getItem('e2p-language') || 'ko'; } catch (_) {}
  setLanguage(savedLanguage);
  koButton?.addEventListener('click', () => setLanguage('ko'));
  enButton?.addEventListener('click', () => setLanguage('en'));

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.nav-toggle');
  const setMenu = (open) => {
    menu?.classList.toggle('open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
  };
  menuButton?.addEventListener('click', () => setMenu(!menu?.classList.contains('open')));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const revealElements = [...document.querySelectorAll('.reveal')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    revealElements.forEach((element) => observer.observe(element));
  }

  const filterButtons = [...document.querySelectorAll('[data-publication-filter]')];
  const publications = [...document.querySelectorAll('[data-publication-category]')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.publicationFilter || 'all';
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      publications.forEach((publication) => {
        publication.hidden = category !== 'all' && publication.dataset.publicationCategory !== category;
      });
    });
  });
})();
