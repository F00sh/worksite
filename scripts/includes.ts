const globalDict: Record<string, Record<string, string>> = {
  en: {},
  hr: {}
};

export function setLang(lang: string = 'en') {
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(node => {
    const key = node.dataset.i18n;
    if (key) node.textContent = globalDict[lang][key] || key;
  });
}

export async function loadPartials(): Promise<void> {
  const hosts = document.querySelectorAll<HTMLElement>('[data-include]');

  for (const host of hosts) {
    const html = await fetch(host.dataset.include!).then(r => r.text());
    host.innerHTML = html;

    host.querySelectorAll('script[data-run]').forEach(old => {
      const scriptTag = old as HTMLScriptElement;
      const s = document.createElement('script');
      s.type = scriptTag.type || 'text/javascript';
      s.textContent = scriptTag.textContent || '';
      document.body.appendChild(s);
      scriptTag.remove();
    });
  }

  document.querySelectorAll('script[data-i18n]').forEach(tag => {
    const raw = tag.textContent?.trim();
    if (!raw) return;

    const local = JSON.parse(raw);
    Object.assign(globalDict.en, local.en || {});
    Object.assign(globalDict.hr, local.hr || {});
    tag.remove();
  });

  document.dispatchEvent(new Event('partials:loaded'));
}
