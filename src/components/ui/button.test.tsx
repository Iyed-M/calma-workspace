/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
	it("renders its label and handles clicks", async () => {
		const onClick = jest.fn();
		render(<Button onClick={onClick}>Réserver</Button>);
		await userEvent.click(screen.getByRole("button", { name: "Réserver" }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
