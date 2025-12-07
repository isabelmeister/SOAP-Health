import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Você pode especificar a porta desejada
    open: true // Abre automaticamente no navegador
  }
})