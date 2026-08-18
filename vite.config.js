import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // (Or Vue, Svelte, etc.)
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})
