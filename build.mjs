import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { marked } from 'marked'

const SITE = {
  title: 'Random',
  description: 'thoughts.',
  url: 'https://genkio.github.io',
  lang: 'en',
}

const POSTS_DIR = 'posts'
const OUT_DIR = 'dist'

// Charter/Sitka/Georgia are preinstalled on mac, iOS and Windows. No webfont, no network cost.
const CSS = `body{margin:40px auto;max-width:650px;line-height:1.6;font-size:19px;color:#444;padding:0 10px;font-family:Charter,"Bitstream Charter","Sitka Text",Cambria,Georgia,serif}
h1,h2,h3{line-height:1.2}
ul{list-style:none;padding:0}
time{color:#888}
blockquote{border-left:3px solid #ddd;margin-left:0;padding-left:1em;color:#666}`

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const rfc822 = (date) => new Date(`${date}T00:00:00Z`).toUTCString()

const FILENAME = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/

function readPosts() {
  const posts = readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const match = FILENAME.exec(file)
      if (!match) throw new Error(`${file}: filename must be YYYY-MM-DD-slug.md`)
      const [, date, slug] = match
      const raw = readFileSync(join(POSTS_DIR, file), 'utf8').trim()
      const breakAt = raw.indexOf('\n')
      const firstLine = (breakAt === -1 ? raw : raw.slice(0, breakAt)).trim()
      if (!firstLine.startsWith('# ')) throw new Error(`${file}: first line must be "# Title"`)
      const body = breakAt === -1 ? '' : raw.slice(breakAt + 1).trim()
      return { date, slug, title: firstLine.slice(2).trim(), html: marked.parse(body) }
    })
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

const page = (title, body) => `<!doctype html>
<html lang="${SITE.lang}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<link rel="alternate" type="application/rss+xml" title="${esc(SITE.title)}" href="${SITE.url}/feed.xml">
<style>${CSS}</style>
${body}`

const indexPage = (posts) =>
  page(
    SITE.title,
    `<h1>${esc(SITE.title)}</h1>
<p>${esc(SITE.description)} <a href="/feed.xml">RSS</a></p>
<ul>
${posts
  .map(
    (p) =>
      `<li><time datetime="${p.date}">${p.date}</time> <a href="/${p.slug}/">${esc(p.title)}</a></li>`
  )
  .join('\n')}
</ul>`
  )

const postPage = (post) =>
  page(
    `${post.title} - ${SITE.title}`,
    `<h1>${esc(post.title)}</h1>
<p><time datetime="${post.date}">${post.date}</time></p>
${post.html}
<p><a href="/">&larr; all posts</a></p>`
  )

const feed = (posts) => `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(SITE.title)}</title>
<link>${SITE.url}/</link>
<description>${esc(SITE.description)}</description>
<language>${SITE.lang}</language>
<lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>
<atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (p) => `<item>
<title>${esc(p.title)}</title>
<link>${SITE.url}/${p.slug}/</link>
<guid isPermaLink="true">${SITE.url}/${p.slug}/</guid>
<pubDate>${rfc822(p.date)}</pubDate>
<description><![CDATA[${p.html}]]></description>
</item>`
  )
  .join('\n')}
</channel>
</rss>
`

const posts = readPosts()
if (posts.length === 0) throw new Error(`no posts found in ${POSTS_DIR}/`)

rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(join(OUT_DIR, 'index.html'), indexPage(posts))
writeFileSync(join(OUT_DIR, 'feed.xml'), feed(posts))
for (const post of posts) {
  mkdirSync(join(OUT_DIR, post.slug), { recursive: true })
  writeFileSync(join(OUT_DIR, post.slug, 'index.html'), postPage(post))
}

console.log(`built ${posts.length} posts into ${OUT_DIR}/`)
