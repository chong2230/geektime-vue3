const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {  // 配置多页面应用
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        account: resolve(__dirname, 'account/index.html')
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '/src') }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `$injectedColor: orange;`
        additionalData: '@import "./src/assets/scss/base.scss";'
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://time.geekbang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/stc': {
        target: 'https://static001.geekbang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/stc/, '')
      },
      '/u': {
        target: 'https://u.geekbang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/u/, '')
      },
      '/act': {
        target: 'https://account.geekbang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/act/, '')
      }
    }
  }
})
