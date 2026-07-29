import { createServer } from 'node:http'
import { watch, readdirSync, statSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { extname, join, normalize } from 'node:path'

const PORT = Number(process.env.PORT) || 8000
const SRC = 'posts'
const OUT = 'dist'

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.xml': 'application/rss+xml; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
}

// injected per-response, never written into dist/
const RELOAD = `<script>new EventSource("/__reload").onmessage=()=>location.reload()</script>`

const clients = new Set()

function build() {
  try {
    execFileSync(process.execPath, ['build.mjs'], { stdio: 'inherit' })
    return true
  } catch {
    console.error('build failed, serving last good output')
    return false
  }
}

const server = createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])

  if (url === '/__reload') {
    res.writeHead(200, {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
    })
    res.write('retry: 500\n\n')
    clients.add(res)
    req.on('close', () => clients.delete(res))
    return
  }

  let file = join(OUT, normalize(url).replace(/^(\.\.[/\\])+/, ''))
  if (!extname(file)) file = join(file, 'index.html')
  const ext = extname(file)

  try {
    const body = await readFile(file)
    res.writeHead(200, {
      'content-type': TYPES[ext] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    })
    res.end(ext === '.html' ? body.toString('utf8') + RELOAD : body)
  } catch {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
    res.end(`<p>404 ${url}</p>${RELOAD}`)
  }
})

// macOS re-delivers 'change' for a single write, sometimes half a second later, so no
// debounce window is reliable. Rebuild only when the inputs have actually changed.
function fingerprint() {
  const inputs = ['build.mjs', ...readdirSync(SRC).map((f) => join(SRC, f))]
  return inputs
    .map((f) => {
      const s = statSync(f)
      return `${f}:${s.mtimeMs}:${s.size}`
    })
    .join('|')
}

let pending
let lastSeen = ''
function onChange() {
  clearTimeout(pending)
  pending = setTimeout(() => {
    const current = fingerprint()
    if (current === lastSeen) return
    lastSeen = current
    if (build()) for (const client of clients) client.write('data: reload\n\n')
  }, 100)
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`port ${PORT} is busy. try: PORT=${PORT + 1} pnpm run serve`)
    process.exit(1)
  }
  throw err
})

build()
lastSeen = fingerprint()
watch(SRC, onChange)
watch('build.mjs', onChange)
server.listen(PORT, () => console.log(`http://localhost:${PORT}  watching ${SRC}/ and build.mjs`))
