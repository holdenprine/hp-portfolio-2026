import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


export default defineConfig({
  plugins: [react(),
    {
      name: 'full-reload',
      handleHotUpdate({ server }) {
        server.ws.send({ type: 'full-reload' })
        return[]
      },
    },
  ],
})
