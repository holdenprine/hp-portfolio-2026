import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'full-reload',
      handleHotUpdate({ server }) {
        server.ws.send({ type: 'full-reload' })
        return[]
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
