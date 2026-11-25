/** @type {import('jest').Config} */
export default {
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	testMatch: ["**/*.test.ts", "**/*.test.tsx"],
	transform: {
		"^.+\\.(t|j)sx?$": [
			"@swc/jest",
			{
				jsc: {
					parser: { syntax: "typescript", tsx: true },
					transform: { react: { runtime: "automatic" } },
				},
				module: { type: "commonjs" },
			},
		],
	},
	moduleNameMapper: {
		"^#/(.*)$": "<rootDir>/src/$1",
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.css(\\?url)?$": "<rootDir>/test/style-mock.cjs",
	},
	setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
};
