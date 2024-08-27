import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // or 'build', depending on your configuration
    base: 'https://prathapgs.github.io/crud/', // Adjust according to your GitHub Pages path

  },
})
