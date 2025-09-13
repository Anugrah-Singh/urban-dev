import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),     tailwindcss()],
  resolve: {
    alias: {
      "langchain/core/utils/env": path.resolve(__dirname, 'src/mocks/env.js'),
    },
  },
})
