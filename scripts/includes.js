// tiny HTML-include helper
document.querySelectorAll('[data-include]').forEach(async host => {
  host.innerHTML = await (await fetch(host.dataset.include)).text();
});