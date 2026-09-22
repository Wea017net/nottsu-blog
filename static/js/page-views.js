(() => {
  const view = document.querySelector('[data-page-view-key]');
  if (!view) return;

  const count = view.querySelector('[data-page-view-count]');
  const key = view.dataset.pageViewKey;
  const storageKey = `page-view:${key}`;
  const apiBase = 'https://abacus.jasoncameron.dev';
  const pendingLifetime = 10 * 60 * 1000;
  let action = 'get';
  let activeStorage;
  let pendingValue;

  // localStorage persists across reloads; sessionStorage is a fallback when it is blocked.
  for (const name of ['localStorage', 'sessionStorage']) {
    try {
      const storage = window[name];
      const previous = storage.getItem(storageKey);
      const pendingAt = previous?.startsWith('pending:')
        ? Number(previous.slice('pending:'.length))
        : 0;
      const recentlyPending = pendingAt > 0 && Date.now() - pendingAt < pendingLifetime;

      if (previous !== '1' && !recentlyPending) {
        // Reserve the hit before sending it, so F5 cannot count the same view twice.
        pendingValue = `pending:${Date.now()}`;
        storage.setItem(storageKey, pendingValue);
        activeStorage = storage;
        action = 'hit';
      }
      break;
    } catch {
      // Storage may be disabled by browser settings.
    }
  }

  // With no writable storage, display the count without adding unbounded hits.
  fetch(`${apiBase}/${action}/blog.nottsu.fun/${key}`, { cache: 'no-store' })
    .then((response) => {
      if (action === 'get' && response.status === 404) return { value: 0 };
      if (!response.ok) throw new Error(`Page view request failed: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const value = Number(data.value);
      if (Number.isSafeInteger(value) && value >= 0) {
        if (activeStorage) {
          try {
            if (activeStorage.getItem(storageKey) === pendingValue) {
              activeStorage.setItem(storageKey, '1');
            }
          } catch {
            // The response can still be displayed when storage becomes unavailable.
          }
        }
        count.textContent = value.toLocaleString('ja-JP');
      }
    })
    .catch(() => {
      // Keep the placeholder if the counter service is unavailable.
    });
})();
