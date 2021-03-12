const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '/src') }
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://time.geekbang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/static': {
        target: 'https://static001.geekbang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/static/, '')
      },
      '/u': {
        target: 'https://u.geekbang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/u/, '')
      },
      '/account': {
        target: 'https://account.geekbang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/account/, '')
      }
    }
  }
})
