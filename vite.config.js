import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is relative so a production build can be hosted anywhere (Netlify / GitHub Pages / opened locally).
export default defineConfig({
  base: './',
  plugins: [react()],
})
