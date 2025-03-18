import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    allowedHosts: [
      '330f-109-245-96-219.ngrok-free.app', // ngrok хост
      'localhost',
      '127.0.0.1' 
    ]
  }
})