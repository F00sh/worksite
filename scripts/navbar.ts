/**
 * navbar.ts
 * Handles mobile menu toggle and link interactions.
 *
 * Usage: compile to JS (e.g. with ts‑node, esbuild, Vite, etc.)
 * and include the output file:
 *   <script type="module" src="/assets/js/navbar.js"></script>
 */

/** Helper to query element by id safely. */
function byId<T extends Element>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

const initNavbar = (): void => {
  const btn   = byId<HTMLButtonElement>('menu-toggle');
  const panel = byId<HTMLDivElement>('mobile-menu');
  const ham   = byId<SVGPathElement>('icon-hamburger');
  const close = byId<SVGPathElement>('icon-close');

  if (!btn || !panel || !ham || !close) return; // bail if markup missing

  const toggleMenu = (): void => {
    const isClosed = panel.classList.toggle('translate-x-full');
    ham?.classList.toggle('hidden', !isClosed);
    close?.classList.toggle('hidden', isClosed);
  };

  // Attach listeners
  btn.addEventListener('click', toggleMenu);

  // Close when a nav link or language button is clicked
  panel.querySelectorAll<HTMLElement>('.mobile-link, .lang-btn').forEach(el =>
    el.addEventListener('click', () => {
      if (!panel.classList.contains('translate-x-full')) toggleMenu();
    })
  );
};

// Run when DOM is ready (handles script in <head> or end of body)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}

export {};
