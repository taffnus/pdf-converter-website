// Highlights the current section in the table of contents while scrolling.
(function () {
  const links = Array.from(document.querySelectorAll(".toc a"));
  if (!links.length) return;

  const byId = new Map();
  links.forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    byId.set(id, a);
  });

  const sections = links
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  let current = null;
  const setActive = (id) => {
    if (id === current) return;
    current = id;
    links.forEach((a) => a.classList.remove("active"));
    const a = byId.get(id);
    if (a) a.classList.add("active");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the entry closest to the top that is intersecting.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
})();

// Reading progress. Same cyan line used everywhere else on the site, here
// showing how far through a long document you are. The element is created
// here rather than in each page's markup so the three legal documents stay
// pure content.
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const bar = document.createElement("div");
  bar.className = "readbar";
  document.body.appendChild(bar);

  let queued = false;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    bar.style.transform = "scaleX(" + progress + ")";
    queued = false;
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
