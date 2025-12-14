/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		exclude: ["node_modules", "dist"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["node_modules/", "src/test/", "**/*.d.ts", "**/*.config.*", "src/main.tsx"],
			thresholds: {
				statements: 70,
				branches: 70,
				functions: 70,
				lines: 70,
			},
		},
		css: true,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@components": resolve(__dirname, "./src/components"),
			"@pages": resolve(__dirname, "./src/pages"),
			"@hooks": resolve(__dirname, "./src/hooks"),
			"@services": resolve(__dirname, "./src/services"),
			"@context": resolve(__dirname, "./src/context"),
			"@types": resolve(__dirname, "./src/types"),
			"@utils": resolve(__dirname, "./src/utils"),
		},
	},
});
