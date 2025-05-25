// scripts/includes.js (ES module)
const globalDict = { en: {}, hr: {} };          // master pool

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
    host.outerHTML = html;
   // after you’ve set host.outerHTML = html;
document.querySelectorAll('script[data-run]').forEach(old => {
  const s = document.createElement('script');
  s.type = old.type || 'text/javascript';   // works for 'module' too
  s.textContent = old.textContent;
  document.body.appendChild(s);             // executes
  old.remove();
});
                        // inject markup
  }
  // after all partials are in the DOM, gather any inline i18n JSON blocks
  document.querySelectorAll('script[data-i18n]').forEach(tag => {
    const local = JSON.parse(tag.textContent.trim());
    Object.assign(globalDict.en, local.en || {});
    Object.assign(globalDict.hr, local.hr || {});
    tag.remove();                               // keep DOM clean
  });
}
