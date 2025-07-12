import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  base: '/tonapi-comp/',
  plugins: [
    react(),
    nodePolyfills(),
  ],
  server: {
    port: 3000,
    open: true,
  },
})