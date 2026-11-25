import type { Page } from "@playwright/test";

/** Saves the acceptance screenshot used in Jira and in the report: docs/evidence/<story>/<ac>.png */
export async function evidence(page: Page, story: string, ac: string) {
	await page.screenshot({
		path: `docs/evidence/${story}/${ac}.png`,
		fullPage: true,
	});
}
