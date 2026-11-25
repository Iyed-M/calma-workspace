import { expect, test } from "@playwright/test";
import { evidence } from "./evidence";

test.describe("SCRUM-31 — Mise en place du projet", () => {
	test("AC1 — la page d'accueil s'affiche", async ({ page }) => {
		await page.goto("/");
		await expect(
			page.getByRole("heading", { name: "Calma WorkSpace" }),
		).toBeVisible();
		await evidence(page, "SCRUM-31", "AC1");
	});
});
