import { resolve } from "node:path"
import { defineConfig } from "vite"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteImageOptimizer({})],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
})
