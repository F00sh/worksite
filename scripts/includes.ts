/*************************************************************************
 *  scripts/includes.ts
 *  Universal partial loader + i18n + Alpine bootstrap
 *************************************************************************/

// Removed reference because alpinejs includes its own types

import Alpine from 'alpinejs';

/* ------------------------------------------------------------------ */
/* 1. i18n dictionary + translator                                    */
/* ------------------------------------------------------------------ */
const dict: Record<string, Record<string, string>> = { en: {}, hr: {} };

export function setLang(lang: string = 'en'): void {
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    el.textContent = dict[lang][key] || key;
  });
}

/*  Expose to Alpine buttons  */
(window as any).setLang = setLang;

/* ------------------------------------------------------------------ */
/* 2. loadPartials                                                    */
/* ------------------------------------------------------------------ */
export async function loadPartials(): Promise<void> {
  const placeholders = document.querySelectorAll<HTMLDivElement>('[data-include]');

  for (const host of placeholders) {
    /* fetch & inject fragment */
    const html = await fetch(host.dataset.include!).then((r) => r.text());
    host.outerHTML = html;
  }

  /* run <script data-run> blocks (rarely needed) */
  document.querySelectorAll<HTMLScriptElement>('script[data-run]').forEach((old) => {
    const s = document.createElement('script');
    s.type = old.type || 'text/javascript';
    s.textContent = old.textContent || '';
    document.body.appendChild(s);
    old.remove();
  });

  /* collect inline i18n JSON and merge */
  document.querySelectorAll<HTMLScriptElement>('script[data-i18n]').forEach((tag) => {
    try {
      const local = JSON.parse(tag.textContent!.trim());
      Object.assign(dict.en, local.en || {});
      Object.assign(dict.hr, local.hr || {});
    } catch {
      console.warn('Bad i18n JSON in fragment:', tag);
    }
    tag.remove();
  });

  /* wake Alpine in the new DOM */
  Alpine.initTree(document.body);

  /* tell rest of app we're ready */
  document.dispatchEvent(new Event('partials:loaded'));
}
