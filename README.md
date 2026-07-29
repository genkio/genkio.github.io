# genkio.github.io

Blog source. Markdown in, static HTML out.

## Writing

Add a file to `posts/` named `YYYY-MM-DD-slug.md`. The date prefix is the published
date, the slug is the URL. First line must be the title as an `# H1`:

```markdown
# On Something

First paragraph...

Second paragraph. Separate paragraphs with a blank line, a single
newline is not a paragraph break in markdown.
```

That's the whole format. No front matter.

`posts/2026-07-06-on-creating-take-2.md` publishes to `/on-creating-take-2/`
dated 2026-07-06.

## Building

```bash
pnpm install
pnpm run build   # -> dist/
pnpm run serve   # http://localhost:8000, rebuilds and reloads on save
```

`serve` watches `posts/` and `build.mjs`, rebuilds on change, and pushes a reload
to the browser over SSE. The reload snippet is injected per response by `dev.mjs`,
so it never reaches `dist/`.

Push to `main` and the Deploy workflow publishes to GitHub Pages.

## Output

- `dist/index.html` - post list, newest first
- `dist/<slug>/index.html` - one page per post
- `dist/feed.xml` - RSS 2.0, full post content

Site title, description and URL live in the `SITE` object at the top of `build.mjs`.
Styling is the `CSS` constant in the same file, after
[bettermotherfuckingwebsite.com](http://bettermotherfuckingwebsite.com/).
