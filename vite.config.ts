/// <reference types="vitest" />
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    TanStackRouterVite(),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./tests/setup-tests.ts"],
  },
});
