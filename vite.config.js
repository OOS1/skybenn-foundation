import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/skybenn-foundation/',   // must match repo name exactly (case-sensitive)
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        programs: resolve(__dirname, 'programs.html'),
        donate: resolve(__dirname, 'donate.html'),
        contact: resolve(__dirname, 'contact.html'),
      }
    }
  }
})