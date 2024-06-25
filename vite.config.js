import {
  fileURLToPath, URL
} from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.NODE_ENV === 'production' ? env.VITE_BASE : '/',
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "./src/assets/scss/element.scss";'
    //     }
    //   }
    // },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
