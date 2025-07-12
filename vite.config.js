import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'


export default defineConfig({
  plugins: [

    nodePolyfills(),
    react(),
  ],

  optimizeDeps: {
    esbuildOptions: {
      define: { global: 'globalThis' },
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true, process: true }),

      ],
    },
  },

  resolve: {
    alias: {
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },

  build: {
    commonjsOptions: {
      include: [
        /node_modules/,
        /rollup-plugin-node-polyfills/,
      ],
    },
  },

  // 6) Global‐this shim
  define: {
    global: 'globalThis',
  },

  server: {
    port: 3000,
    open: true,
  },
})
