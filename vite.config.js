import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/SOABOS-Dashboard/',
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'app/index.html')
    }
  }
})
