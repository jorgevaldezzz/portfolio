(() => {
  const path = window.location.pathname.replace(/\/+$/, "");
  const segments = path.split("/").filter(Boolean);
  const file = segments[segments.length - 1] || "index.html";
  const inLab = segments.includes("security-lab");
  const inBlog = segments.includes("blog");

  document.querySelectorAll(".navbar-links > li > a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const text = (link.textContent || "").trim().toLowerCase();
    let active = false;

    if (text === "lab" && inLab) active = true;
    else if (text === "blog" && inBlog) active = true;
    else if (text === "about" && file === "about.html") active = true;
    else if (
      text === "home" &&
      !inLab &&
      !inBlog &&
      (file === "index.html" || segments.length === 0)
    ) {
      active = true;
    }

    if (active) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll(".navbar-lab-links a").forEach((link) => {
    const href = (link.getAttribute("href") || "").split("/").pop();
    if (href && file === href) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  const sections = Array.from(document.querySelectorAll("main.content section[id]"));
  if (!sections.length) return;

  const tocLinks = Array.from(
    document.querySelectorAll('.toc a[href^="#"], .toc-mobile a[href^="#"]')
  );
  if (!tocLinks.length) return;

  const byId = new Map();
  tocLinks.forEach((link) => {
    const id = (link.getAttribute("href") || "").slice(1);
    if (!id) return;
    if (!byId.has(id)) byId.set(id, []);
    byId.get(id).push(link);
  });

  let last = null;
  const setActive = (id) => {
    if (!id || id === last) return;
    last = id;
    tocLinks.forEach((l) => l.classList.remove("active"));
    (byId.get(id) || []).forEach((l) => l.classList.add("active"));
  };

  const pick = () => {
    const offset = 120;
    let best = null;
    let bestDist = Infinity;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const dist = Math.abs(rect.top - offset);
      if (rect.bottom >= offset && dist < bestDist) {
        best = section.id;
        bestDist = dist;
      }
    });
    if (!best && sections.length) best = sections[sections.length - 1].id;
    setActive(best);
  };

  let raf = null;
  const onScroll = () => {
    if (raf !== null) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      pick();
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  pick();
})();
