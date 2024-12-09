import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   target: 'esnext' //browsers can handle the latest ES features
  // },
  plugins: [
    vue(),
    react()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./packages/epicenter-vue-components/src', import.meta.url)),
      // temporary workaround until this is a proper package
      'epicenter-icons': fileURLToPath(new URL('./packages/epicenter-icons/index.js', import.meta.url)),
    }
  },
})
