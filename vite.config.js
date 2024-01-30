import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outdir: '../VisitBnb-backend/public',
    emptyOutDir: true
  }
})
