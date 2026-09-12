(() => {
  const root = document.documentElement;
  const body = document.body;
  const koButton = document.querySelector('[data-lang-button="ko"]');
  const enButton = document.querySelector('[data-lang-button="en"]');
  // Resolve from this script, so nested 404 URLs still find the i18n assets.
  const assetBase = new URL('.', document.currentScript?.src || new URL('assets/site.js', document.baseURI).href);
  const mapFiles = Array.from({ length: 9 }, (_, i) => new URL(`i18n/i18n-${String(i + 1).padStart(2, '0')}.json`, assetBase).href);
  const isPageLink = (link, page) => new URL(link.href, document.baseURI).pathname.endsWith(`/${page}`);
  let translations = {};
  let activeLanguage = 'ko';
  const textBindings = [];
  let updateFilterStatus = () => {};

  const syncAccessibleLabels = (lang) => {
    const ko = lang === 'ko';
    document.querySelector('.menu')?.setAttribute('aria-label', ko ? '주 메뉴' : 'Main navigation');
    document.querySelector('.lang-toggle')?.setAttribute('aria-label', ko ? '언어 선택' : 'Language selection');
    koButton?.setAttribute('aria-label', '한국어 (KO)');
    koButton?.setAttribute('lang', 'ko');
    enButton?.setAttribute('aria-label', 'English (EN)');
    enButton?.setAttribute('lang', 'en');
    const toggle = document.querySelector('.nav-toggle');
    const open = toggle?.getAttribute('aria-expanded') === 'true';
    toggle?.setAttribute('aria-label', ko ? (open ? '메뉴 닫기' : '메뉴 열기') : (open ? 'Close navigation' : 'Open navigation'));
    document.querySelector('.pub-filter')?.setAttribute('aria-label', ko ? '논문 분야 필터' : 'Publication filters');
    document.querySelector('.registry-wrap')?.setAttribute('aria-label', ko ? '공개 지식재산 목록' : 'Public IP registry');
  };

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
    const howWeWorkLink = menu ? Array.from(menu.querySelectorAll('a')).find((link) => isPageLink(link, 'group.html')) : null;
    const peopleLink = menu ? Array.from(menu.querySelectorAll('a')).find((link) => isPageLink(link, 'people.html')) : null;
    if (howWeWorkLink) {
      howWeWorkLink.textContent = lang === 'ko' ? '운영 방식' : 'HOW WE WORK';
      if (peopleLink && peopleLink.nextElementSibling !== howWeWorkLink) {
        peopleLink.insertAdjacentElement('afterend', howWeWorkLink);
      }
    }
    document.querySelectorAll('.footer-links a').forEach((link) => {
      if (isPageLink(link, 'group.html')) link.textContent = lang === 'ko' ? '운영 방식' : 'How We Work';
    });
  };

  const setLanguage = (language) => {
    const lang = language === 'en' ? 'en' : 'ko';
    activeLanguage = lang;
    body.dataset.lang = lang;
    root.lang = lang;
    applyLocalizedText(lang);
    syncDynamicLabels(lang);
    koButton?.setAttribute('aria-pressed', String(lang === 'ko'));
    enButton?.setAttribute('aria-pressed', String(lang === 'en'));
    syncAccessibleLabels(lang);
    updateFilterStatus();
    try { localStorage.setItem('p2e-language', lang); } catch (_) {}
  };

  let initialLanguage = 'ko';
  try { initialLanguage = localStorage.getItem('p2e-language') || 'ko'; } catch (_) {}
  initialLanguage = initialLanguage === 'en' ? 'en' : 'ko';
  setLanguage(initialLanguage);
  // The controls work immediately, even while translation files are loading.
  koButton?.addEventListener('click', () => setLanguage('ko'));
  enButton?.addEventListener('click', () => setLanguage('en'));

  const menu = document.querySelector('.menu');
  const howWeWorkLink = menu ? Array.from(menu.querySelectorAll('a')).find((link) => isPageLink(link, 'group.html')) : null;
  const peopleLink = menu ? Array.from(menu.querySelectorAll('a')).find((link) => isPageLink(link, 'people.html')) : null;
  if (howWeWorkLink && peopleLink && peopleLink.nextElementSibling !== howWeWorkLink) {
    peopleLink.insertAdjacentElement('afterend', howWeWorkLink);
  }

  const initLanguage = async () => {
    try {
      const maps = await Promise.all(mapFiles.map(async (url) => {
        // One stalled request must not prevent all other dictionaries from applying.
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        try {
          const response = await fetch(url, { cache: 'no-cache', signal: controller.signal });
          if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
          return await response.json();
        } catch (error) {
          console.error(`P2E i18n map load failed for ${url}`, error);
          return {};
        } finally {
          clearTimeout(timeout);
        }
      }));
      translations = Object.assign({}, ...maps);
      bindTranslatableText();
      setLanguage(activeLanguage);
    } catch (error) {
      console.error('P2E i18n initialization failed', error);
      syncDynamicLabels(activeLanguage);
    }

  };

  initLanguage();

  const menuButton = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  const mobileMenu = window.matchMedia('(max-width: 1080px)');
  // Do not reuse --header-height here: it defines min-height and would form a sizing loop.
  const syncHeaderOffset = () => {
    if (header) root.style.setProperty('--header-offset', `${Math.ceil(header.getBoundingClientRect().height)}px`);
  };
  syncHeaderOffset();
  if (header && 'ResizeObserver' in window) {
    new ResizeObserver(syncHeaderOffset).observe(header);
  } else {
    window.addEventListener('resize', syncHeaderOffset);
  }
  const setMenu = (open, restoreFocus = false) => {
    const wasOpen = menu?.classList.contains('open');
    menu?.classList.toggle('open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    syncAccessibleLabels(activeLanguage);
    if (!open && wasOpen && restoreFocus) menuButton?.focus();
  };
  if (menu && menuButton) {
    let focusWasInMenu = false;
    document.addEventListener('focusin', (event) => {
      focusWasInMenu = event.target instanceof Node && menu.contains(event.target);
    });
    menuButton.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      setMenu(open);
      // Nav appears before the toggle in DOM order; direct keyboard focus to it.
      if (open) menu.querySelector('a')?.focus();
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
    root.classList.add('nav-ready');
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('open')) {
        event.preventDefault();
        setMenu(false, true);
      }
    });
    document.addEventListener('click', (event) => {
      if (event.target instanceof Node && header && !header.contains(event.target)) setMenu(false);
    });
    header?.addEventListener('focusout', (event) => {
      if (event.relatedTarget instanceof Node && !header.contains(event.relatedTarget)) setMenu(false);
    });
    const onBreakpointChange = () => {
      const focusedLinkWillBeHidden = mobileMenu.matches && (focusWasInMenu || menu.contains(document.activeElement));
      setMenu(false);
      if (focusedLinkWillBeHidden) menuButton.focus();
    };
    if (mobileMenu.addEventListener) mobileMenu.addEventListener('change', onBreakpointChange);
    else mobileMenu.addListener(onBreakpointChange);
  }

  // Static research content does not need a scroll-triggered entrance animation.
  root.classList.remove('reveal-ready');
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));

  const filterButtons = [...document.querySelectorAll('[data-publication-filter]')];
  const publications = [...document.querySelectorAll('[data-publication-category]')];
  const filterStatus = document.getElementById('publication-filter-status');
  updateFilterStatus = () => {
    if (!filterStatus) return;
    const visible = publications.filter((publication) => !publication.hidden).length;
    filterStatus.textContent = activeLanguage === 'ko'
      ? `전체 ${publications.length}건 중 ${visible}건 표시`
      : `Showing ${visible} of ${publications.length} publications`;
  };
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.publicationFilter || 'all';
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      publications.forEach((publication) => {
        publication.hidden = category !== 'all' && publication.dataset.publicationCategory !== category;
      });
      updateFilterStatus();
    });
  });
  if (filterButtons.length && publications.length) {
    root.classList.add('publication-filter-ready');
    updateFilterStatus();
  }
})();
