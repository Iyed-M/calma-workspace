# ADR 001 — Stack technique

**Statut** : accepté (Sprint 1)

## Contexte

Application web de réservation, développée par deux personnes en parallèle en 6 semaines. Le cours impose un framework de test parmi JUnit, pytest ou Jest.

## Décision

| Besoin | Choix |
| :--- | :--- |
| Langage | TypeScript (strict) |
| Framework full-stack | TanStack Start (React 19, routage par fichiers, server functions) |
| UI | shadcn/ui + Tailwind CSS v4 |
| Formulaires | react-hook-form + zod (`@hookform/resolvers`), composants `Field` de shadcn |
| Données côté client | TanStack Query |
| Base de données | PostgreSQL 17 (Docker en local) |
| ORM / migrations | Drizzle ORM + drizzle-kit |
| Authentification | Better Auth (email + mot de passe) |
| Tests | Jest 30 (+ `@swc/jest`), Testing Library pour les composants |
| Lint / format | Biome |
| CI | GitHub Actions |

## Conséquences

- Une seule application à lancer et déployer : front et API dans le même projet.
- Les schémas zod sont partagés entre le formulaire (validation client) et la server function (validation serveur), ce qui couvre les critères « vérifié côté serveur » (US06, US12).
- Vite propose Vitest par défaut ; on utilise Jest pour respecter le cours. Jest transpile en CommonJS via SWC : un test qui importe une bibliothèque publiée uniquement en ESM peut échouer. Les règles métier sont donc écrites en fonctions pures dans `src/domain/`, testables sans le framework.
