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

    const integrityTitle = document.querySelector('#collaborative-integrity-fit b');
    const integrityDetail = document.querySelector('#collaborative-integrity-fit span');
    if (integrityTitle) integrityTitle.textContent = lang === 'ko' ? '사람과 credit을 존중하면서 솔직하게 challenge하는 사람' : 'Someone who challenges ideas honestly while respecting people and credit';
    if (integrityDetail) integrityDetail.textContent = lang === 'ko' ? '동료의 ownership을 존중하고, 다른 의견은 뒤에서가 아니라 근거를 가지고 직접 논의하는 사람' : 'Someone who respects colleagues’ ownership and discusses disagreements directly, with evidence rather than behind the scenes';

    const promiseLabel = document.querySelector('#researcher-promise > b');
    if (promiseLabel) promiseLabel.textContent = lang === 'ko' ? '연구자에 대한 약속. ' : 'Researcher promise. ';
  };

  const setLanguage = (language) => {
    const lang = language === 'en' ? 'en' : 'ko';
    body.dataset.lang = lang;
    root.lang = lang;
    applyLocalizedText(lang);
    syncDynamicLabels(lang);
    koButton?.setAttribute('aria-pressed', String(lang === 'ko'));
    enButton?.setAttribute('aria-pressed', String(lang === 'en'));
    try { localStorage.setItem('e2p-language', lang); } catch (_) {}
  };

  let initialLanguage = 'ko';
  try { initialLanguage = localStorage.getItem('e2p-language') || 'ko'; } catch (_) {}
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

  if (document.querySelector('#fit .join-grid')) {
    const firstFitList = document.querySelector('#fit .join-grid .fit-list');
    if (firstFitList && !document.getElementById('collaborative-integrity-fit')) {
      const item = document.createElement('div');
      item.className = 'fit-item';
      item.id = 'collaborative-integrity-fit';
      const title = document.createElement('b');
      const detail = document.createElement('span');
      item.append(title, detail);
      firstFitList.appendChild(item);
    }
  }

  const growthShell = document.querySelector('#growth .shell');
  if (growthShell && !document.getElementById('researcher-promise')) {
    const promise = document.createElement('div');
    promise.className = 'callout';
    promise.id = 'researcher-promise';
    const label = document.createElement('b');
    const ko = document.createElement('span');
    ko.className = 'lang-ko';
    ko.textContent = 'E2P의 목표는 사람을 오래 붙잡아 두는 것이 아닙니다. 함께한 연구자가 합류할 때보다 더 큰 capability, 더 선명한 research ownership, 더 넓은 career choices를 가지고 다음 단계로 갈 수 있게 하는 것을 중요하게 생각합니다.';
    const en = document.createElement('span');
    en.className = 'lang-en';
    en.textContent = 'Our goal is not to keep people indefinitely. We want researchers to leave E2P with more capability, clearer research ownership and more career choices than when they joined.';
    promise.append(label, ko, en);
    growthShell.appendChild(promise);
  }

  const initLanguage = async () => {
    try {
      const maps = await Promise.all(mapFiles.map(async (url) => {
        const response = await fetch(url, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
        return response.json();
      }));
      translations = Object.assign({}, ...maps);
      bindTranslatableText();
      setLanguage(initialLanguage);
    } catch (error) {
      console.error('E2P i18n map load failed', error);
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
