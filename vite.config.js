import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// esbuild plugins for dev‑time polyfills
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// Rollup polyfills for build‑time
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [

    nodePolyfills(),
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true, process: true }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },

  resolve: {
    alias: {
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
  define: {
    global: 'globalThis',
  },

  server: {
    port: 3000,
    open: true,
  },
})
