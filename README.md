# Jorge Valdez — Portfolio

Static Signal Field portfolio: home, about, blog, and the security-lab trilogy.

## Local preview

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`.

## Structure

- `index.html` — home (hero + featured work)
- `about.html` — background, skills, projects
- `blog/index.html` — writeup index
- `projects/security-lab/` — detection lab writeup, IR report, analyst playbook
- `styles.css` — shared Signal Field design system
- `vercel.json` — redirects from the old lab root URLs
