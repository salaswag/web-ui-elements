import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // allow Railway's *.up.railway.app domain (and any host) when serving the built app
  preview: {
    host: true,
    allowedHosts: true,
  },
})
