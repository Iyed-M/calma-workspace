import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main className="p-8">
			<h1 className="text-4xl font-bold">Calma WorkSpace</h1>
			<p className="mt-4 text-lg">
				Réservation de salles de travail et d'étude.
			</p>
		</main>
	);
}
