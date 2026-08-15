(() => {
  const root = document.documentElement;
  const body = document.body;
  const koButton = document.querySelector('[data-lang-button="ko"]');
  const enButton = document.querySelector('[data-lang-button="en"]');
  const mapFiles = Array.from({ length: 9 }, (_, i) => `assets/i18n/i18n-${String(i + 1).padStart(2, '0')}.json`);
  let translations = {};
  const textBindings = [];

  const insideExplicitLanguage = (node) => {
    let el = node.parentElement;
    while (el) {
      if (el.classList?.contains('lang-ko') || el.classList?.contains('lang-en')) return true;
      el = el.parentElement;
    }
    return false;
  };

  const bindTranslatableText = () => {
    textBindings.length = 0;
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (insideExplicitLanguage(node)) continue;
      const raw = node.nodeValue || '';
      const match = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const key = match?.[2] || '';
      if (!key || !translations[key]) continue;
      textBindings.push({ node, key, prefix: match[1], suffix: match[3] });
    }
  };

  const applyLocalizedText = (lang) => {
    textBindings.forEach(({ node, key, prefix, suffix }) => {
      const value = translations[key]?.[lang];
      if (value !== undefined) node.nodeValue = `${prefix}${value}${suffix}`;
    });
  };

  const syncDynamicLabels = (lang) => {
    const menu = document.querySelector('.menu');
    const howWeWorkLink = menu ? Array.from(menu.querySelectorAll('a')).find((link) => link.getAttribute('href') === 'group.html') : null;
    const peopleLink = menu ? Array.from(menu.querySelectorAll('a')).find((link) => link.getAttribute('href') === 'people.html') : null;
    if (howWeWorkLink) {
      howWeWorkLink.textContent = lang === 'ko' ? '운영 방식' : 'HOW WE WORK';
      if (peopleLink && peopleLink.nextElementSibling !== howWeWorkLink) {
        peopleLink.insertAdjacentElement('afterend', howWeWorkLink);
      }
    }
    document.querySelectorAll('.footer-links a').forEach((link) => {
      if (link.getAttribute('href') === 'group.html') link.textContent = lang === 'ko' ? '운영 방식' : 'How We Work';
    });
  };

  const setLanguage = (language) => {
    const lang = language === 'en' ? 'en' : 'ko';
    body.dataset.lang = lang;
    root.lang = lang;
    applyLocalizedText(lang);
    syncDynamicLabels(lang);
    koButton?.setAttribute('aria-pressed', String(lang === 'ko'));
    enButton?.setAttribute('aria-pressed', String(lang === 'en'));
    try { localStorage.setItem('p2e-language', lang); } catch (_) {}
  };

  let initialLanguage = 'ko';
  try { initialLanguage = localStorage.getItem('p2e-language') || 'ko'; } catch (_) {}
  initialLanguage = initialLanguage === 'en' ? 'en' : 'ko';
  body.dataset.lang = initialLanguage;
  root.lang = initialLanguage;
  koButton?.setAttribute('aria-pressed', String(initialLanguage === 'ko'));
  enButton?.setAttribute('aria-pressed', String(initialLanguage === 'en'));

  const menu = document.querySelector('.menu');
  const howWeWorkLink = menu ? Array.from(menu.querySelectorAll('a')).find((link) => link.getAttribute('href') === 'group.html') : null;
  const peopleLink = menu ? Array.from(menu.querySelectorAll('a')).find((link) => link.getAttribute('href') === 'people.html') : null;
  if (howWeWorkLink && peopleLink && peopleLink.nextElementSibling !== howWeWorkLink) {
    peopleLink.insertAdjacentElement('afterend', howWeWorkLink);
  }

  const initLanguage = async () => {
    try {
      const maps = await Promise.all(mapFiles.map(async (url) => {
        try {
          const response = await fetch(url, { cache: 'no-cache' });
          if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
          return await response.json();
        } catch (error) {
          console.error(`P2E i18n map load failed for ${url}`, error);
          return {};
        }
      }));
      translations = Object.assign({}, ...maps);
      bindTranslatableText();
      setLanguage(initialLanguage);
    } catch (error) {
      console.error('P2E i18n initialization failed', error);
      syncDynamicLabels(initialLanguage);
    }

    koButton?.addEventListener('click', () => setLanguage('ko'));
    enButton?.addEventListener('click', () => setLanguage('en'));
  };

  initLanguage();

  const menuButton = document.querySelector('.nav-toggle');
  const setMenu = (open) => {
    menu?.classList.toggle('open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
  };
  if (menu && menuButton) {
    menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
    root.classList.add('nav-ready');
  }
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
    root.classList.add('reveal-ready');
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
