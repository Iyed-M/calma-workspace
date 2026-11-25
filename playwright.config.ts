import { defineConfig, devices } from "@playwright/test";

// Acceptance tests: one spec per story (e2e/SCRUM-<n>.spec.ts), one test per acceptance criterion.
export default defineConfig({
	testDir: "./e2e",
	fullyParallel: false,
	workers: 1,
	reporter: [["list"]],
	use: {
		baseURL: "http://localhost:4173",
		locale: "fr-FR",
		timezoneId: "Africa/Tunis",
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: {
		command: "pnpm build && pnpm preview --port 4173 --strictPort",
		url: "http://localhost:4173",
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
