function setupSectionHighlighting() {
    const sectionIds = Array.from(document.querySelectorAll("main.content section[id]"))
        .map((section) => section.id)
        .filter(Boolean);

    if (!sectionIds.length) return;

    const navLinks = Array.from(document.querySelectorAll('.navbar-links a[href^="#"], .toc a[href^="#"]'));
    const linksByTarget = new Map();

    navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const target = href.slice(1);
        if (!target) return;

        if (!linksByTarget.has(target)) {
            linksByTarget.set(target, []);
        }
        linksByTarget.get(target).push(link);
    });

    let lastActiveId = null;

    function setActive(id) {
        if (!id || id === lastActiveId) return;
        lastActiveId = id;

        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLinks = linksByTarget.get(id) || [];
        activeLinks.forEach((link) => link.classList.add("active"));
    }

    function pickActiveSection() {
        const topOffset = 120;
        let bestId = null;
        let bestDistance = Number.POSITIVE_INFINITY;

        sectionIds.forEach((id) => {
            const section = document.getElementById(id);
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - topOffset);

            if (rect.bottom >= topOffset && distance < bestDistance) {
                bestId = id;
                bestDistance = distance;
            }
        });

        if (!bestId) {
            const nearTop = [...sectionIds]
                .map((id) => document.getElementById(id))
                .filter(Boolean)
                .find((section) => section.getBoundingClientRect().top > 0);
            bestId = nearTop ? nearTop.id : sectionIds[sectionIds.length - 1];
        }

        setActive(bestId);
    }

    let rafId = null;
    function requestHighlightUpdate() {
        if (rafId !== null) return;
        rafId = window.requestAnimationFrame(() => {
            rafId = null;
            pickActiveSection();
        });
    }

    window.addEventListener("scroll", requestHighlightUpdate, { passive: true });
    window.addEventListener("resize", requestHighlightUpdate);
    window.addEventListener("hashchange", requestHighlightUpdate);
    requestHighlightUpdate();
}

setupSectionHighlighting();
