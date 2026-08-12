const burgerBtnEl = document.querySelector('[data-action]');
const mobileMenuEl = document.querySelector('[data-visible]');
const mobileMenuConteiner = document.querySelector(
  '[data-header-menu-background]'
);

if (burgerBtnEl && mobileMenuEl) {
  const getTrapFocusEls = () =>
    [...mobileMenuEl.querySelectorAll('a[href], button'), burgerBtnEl].filter(
      el => el.offsetParent !== null
    );

  const openMenu = () => {
    burgerBtnEl.dataset.action = 'close';
    burgerBtnEl.setAttribute('aria-expanded', 'true');
    burgerBtnEl.setAttribute('aria-label', 'Close menu');
    mobileMenuEl.dataset.visible = 'true';
    document.body.dataset.mobileMenu = 'menu-open';
    mobileMenuConteiner.dataset.headerMenuBackground = 'show';

    const firstLink = mobileMenuEl.querySelector('a[href]');
    firstLink?.focus();
  };

  const closeMenu = ({ returnFocus = true } = {}) => {
    burgerBtnEl.dataset.action = 'open';
    burgerBtnEl.setAttribute('aria-expanded', 'false');
    burgerBtnEl.setAttribute('aria-label', 'Open menu');
    mobileMenuEl.dataset.visible = 'false';
    document.body.dataset.mobileMenu = 'menu-close';
    mobileMenuConteiner.dataset.headerMenuBackground = '';

    if (returnFocus) burgerBtnEl.focus();
  };

  burgerBtnEl.addEventListener('click', () => {
    const isOpen = burgerBtnEl.dataset.action === 'close';
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenuEl.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', () => closeMenu({ returnFocus: false }));
  });

  document.addEventListener('keydown', e => {
    const isOpen = burgerBtnEl.dataset.action === 'close';
    if (!isOpen) return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getTrapFocusEls();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
