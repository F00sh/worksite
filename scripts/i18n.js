document.addEventListener('partials:loaded', () =>
  setLang(localStorage.getItem('lang') || 'en')
);