import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',      // Use the buffer npm package
      process: 'process',    // Use the process npm package
    },
  },
  define: {
    global: 'globalThis',    // This is important for Buffer
  },
  server: {
    port: 3000,
    open: true,
  },
})