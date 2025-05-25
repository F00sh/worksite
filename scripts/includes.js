// scripts/includes.js
const globalDict = { en: {}, hr: {} };

export function setLang(lang = 'en') {
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.dataset.i18n;
    node.textContent = globalDict[lang][key] || key;
  });
}

export async function loadPartials() {
  const hosts = document.querySelectorAll('[data-include]');

  for (const host of hosts) {
    const html = await fetch(host.dataset.include).then(r => r.text());

    host.innerHTML = html;

    // re-parse any scripts marked for execution
    host.querySelectorAll('script[data-run]').forEach(old => {
      const s = document.createElement('script');
      s.type = old.type || 'text/javascript'; // works for 'module' too
      s.textContent = old.textContent;
      document.body.appendChild(s);
      old.remove();
    });
  }

  // gather inline i18n payloads from inserted partials
  document.querySelectorAll('script[data-i18n]').forEach(tag => {
    const local = JSON.parse(tag.textContent.trim());
    Object.assign(globalDict.en, local.en || {});
    Object.assign(globalDict.hr, local.hr || {});
    tag.remove();
  });

  document.dispatchEvent(new Event('partials:loaded'));
}
