(() => {
  const content = {
    pinned: {
      title: 'About Me',
      href: 'about.html',
      tag: 'About',
      snippet:
        'Background, coursework, and the skills I keep coming back to across classes, CTFs, and side projects.',
    },
    latest: {
      title: 'Adversary Simulation & Detection Lab',
      href: 'projects/security-lab/index.html',
      summary:
        'A full kill chain simulation across three VMs, with custom Wazuh detection rules, an incident report, and a gap analysis of what the default rules missed.',
      category: 'Security &middot; Detection Engineering',
      date: '2026-06-14',
    },
  };

  const formatDate = (dateString) =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(`${dateString}T00:00:00Z`));

  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };

  const setHtml = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  };

  const setHref = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.href = value;
  };

  setHref('[data-pinned-link]', content.pinned.href);
  setText('[data-pinned-title]', content.pinned.title);
  setText('[data-pinned-snippet]', content.pinned.snippet);
  setText('[data-pinned-tag]', content.pinned.tag);

  setHref('[data-latest-link]', content.latest.href);
  setText('[data-latest-title]', content.latest.title);
  setText('[data-latest-summary]', content.latest.summary);
  setHtml('[data-latest-category]', content.latest.category);
  setText('[data-latest-date]', formatDate(content.latest.date));
})();
