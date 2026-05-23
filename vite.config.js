import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'preview-noindex',
      apply: 'build',
      transformIndexHtml(html) {
        if (process.env.VERCEL_ENV !== 'preview') return html
        return html.replace(
          '</head>',
          '  <meta name="robots" content="noindex,nofollow">\n  </head>'
        )
      },
      closeBundle() {
        if (process.env.VERCEL_ENV !== 'preview') return
        writeFileSync(
          resolve('dist/robots.txt'),
          'User-agent: *\nDisallow: /\n'
        )
      },
    },
  ],
})
