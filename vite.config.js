import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: parseInt(process.env.PORT) || 5173,
    allowedHosts: ['.onrender.com'], // ✅ allow all *.onrender.com domains
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT) || 4173,
    allowedHosts: ['.onrender.com'], // ✅ for preview mode too
  }
})