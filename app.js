(function () {
  const container = document.getElementById("scrollContainer");
  const items = Array.from(document.querySelectorAll(".scroll-list li.item"));

  function centerIndex(index) {
    if (!items[index]) return;
    items[index].scrollIntoView({ behavior: "auto", block: "center" });
  }

  // Start at Item 1 centered
  window.requestAnimationFrame(() => centerIndex(0));

  let ticking = false;
  function updateActive() {
    const rect = container.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    let closest = null;
    let min = Infinity;
    items.forEach((it) => {
      const r = it.getBoundingClientRect();
      const itemCenter = r.top + r.height / 2;
      const dist = Math.abs(itemCenter - centerY);
      if (dist < min) {
        min = dist;
        closest = it;
      }
    });
    items.forEach((i) => i.classList.toggle("active", i === closest));
    ticking = false;
  }

  container.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateActive);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.requestAnimationFrame(updateActive);

  container.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const activeIdx = items.findIndex((i) => i.classList.contains("active"));
    let next = activeIdx;
    if (e.key === "ArrowDown") next = Math.min(items.length - 1, activeIdx + 1);
    else next = Math.max(0, activeIdx - 1);
    items[next].scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
