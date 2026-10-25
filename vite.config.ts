import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Content Security Policy aplicada só na build (o modo dev usa scripts inline do Vite)
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'", // styled-components e estilos inline do React
  "img-src 'self' data: blob: https://thuanypk.goatcounter.com", // pixel do contador de visitas
  "font-src 'self'",
  "connect-src 'self' https://api.emailjs.com https://thuanypk.goatcounter.com https://sblsmmwqadleevuqglez.supabase.co wss://sblsmmwqadleevuqglez.supabase.co",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const cspPlugin = (): Plugin => ({
  name: 'inject-csp',
  apply: 'build',
  transformIndexHtml: () => [
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' },
    { tag: 'meta', attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' }, injectTo: 'head-prepend' },
  ],
})

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), cspPlugin()],
  base: command === 'build' ? '/portfolio/' : '/',
}))
