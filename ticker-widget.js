(function () {
  const url = "https://cdn.statically.io/gh/Grouchy-0wl/Map-data@main/ticker.json";

  function initTicker() {
    const el = document.getElementById("post-ticker-text");
    if (!el) return;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        const items = (Array.isArray(data) ? data : [])
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map(item => {
            const date  = item.Date || item.date || "";
            const event = item.Event || item.event || "";
            return date && event ? `${date} — ${event}` : event || date;
          })
          .filter(Boolean);

        if (!items.length) return;
        el.textContent = items.join("   •   ");
      })
      .catch(() => {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTicker);
  } else {
    initTicker();
  }
})();
