document.addEventListener('partials:loaded', () => {
  import('/scripts/includes.js').then(({ setLang }) => {
    setLang(localStorage.getItem('lang') || 'en');
  });
});

document.addEventListener('lang:change', () => {
  import('/scripts/includes.js').then(({ setLang }) => {
    setLang(localStorage.getItem('lang') || 'en');
  });
});
