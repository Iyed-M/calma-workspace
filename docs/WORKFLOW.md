# Team workflow

Two members, 6 weeks, 3 sprints of 2 weeks, tracked in Jira. Member A codes with Claude Code, Member B with Codex. Both agents read `AGENTS.md` (Claude reads it through `CLAUDE.md`), so they follow the same rules, domain terms, and Definition of Done.

## 1. Roles per sprint

The report must say who held which role in each sprint. With two people, each sprint has one PO and one Scrum Master, and both are developers. Rotate so each of you holds each role at least once:

| Sprint | Product Owner | Scrum Master | Developers |
| :--- | :--- | :--- | :--- |
| 1 | A | B | A, B |
| 2 | B | A | A, B |
| 3 | A | B | A, B |

- **PO**: owns acceptance criteria, orders the backlog, accepts or rejects stories at the review.
- **SM**: runs the ceremonies, keeps the Jira board accurate, removes blockers, takes the burndown screenshot.

## 2. Timeline

| Week | What |
| :--- | :--- |
| 1 (day 1–2) | Setup (SCRUM-31): repo + CI, stack ADR, app running locally, acceptance criteria for all stories |
| 1–2 | **Sprint 1 / Increment 1**: accounts, profiles, auth, salle configuration, availability (US01–US04) |
| 3–4 | **Sprint 2 / Increment 2**: réservation, overlap prevention, capacity, max duration, temps tampon, profile edit (US05, US06, US11, US12) |
| 5–6 | **Sprint 3 / Increment 3**: tarifs, pricing, payment + reçu, daily planning, mes réservations (US07–US09, US13, US14); extensions if time allows (US10…) |
| 6 (end) | Report assembly from `docs/sprints/`, 10-minute defense rehearsal |

## 3. Jira setup (once)

1. Project **Calma Workspace**, key `SCRUM` (team-managed Scrum, board 1). Sprints 1–3 exist; Sprint 1 started 2026-11-24.
2. **Epics = backlog themes**: SCRUM-14 Comptes et profils, SCRUM-15 Gestion des salles, SCRUM-16 Disponibilités, SCRUM-17 Réservation, SCRUM-18 Tarification et paiement, SCRUM-19 Suivi de l'occupation, SCRUM-20 Extensions.
3. **Stories**: one per backlog row, summary prefixed with the US id (`US05 — En tant que client…`), with its epic, priority, story points, and the acceptance criteria from `backlog.md` in the description. The *Vue d'ensemble* table in `backlog.md` maps each US to its Jira key. `backlog.md` stays the source of truth: change it first, then Jira.
4. **Sub-tasks** under each story (e.g. "API endpoint", "form UI", "unit tests", "acceptance test"), each with an assignee and an Original Estimate in hours. Log time on them as you work. This is the report's Sprint Backlog table (tasks, owners, hours).
5. **Board columns**: To Do → In Progress → In Review → Done.
6. Install **GitHub for Jira** so branches, commits, and PRs that contain `SCRUM-<n>` show up on the issue. That is your visible evidence of peer review.
7. **Burndown**: Jira builds it from story points. It is only correct if every story in the sprint has points *before* you press Start Sprint, and you close the sprint at the end. Adding stories mid-sprint shows as a scope jump; if you do it, write down why in the sprint notes.

## 4. Sprint loop

### Sprint planning (start of sprint, ~1h, both)

1. PO presents the stories for the sprint goal, with acceptance criteria. Both of you challenge vague criteria until each one can be checked on a local run.
2. Agree the **shared contracts** for the sprint (entities, routes, rules) and write them into `docs/architecture.md`. Two agents working in parallel collide here first, so settle it before anyone codes.
3. Split the work into vertical slices with a clean seam between owners (suggestion below), create sub-tasks with hour estimates, then Start Sprint.
4. Copy `docs/sprints/_template.md` to `docs/sprints/sprint-N.md` and fill in section 1.

Suggested split, where each pair has a natural boundary:

| Sprint | A | B | Seam |
| :--- | :--- | :--- | :--- |
| 1 (16 pts) | US01, US02: accounts, auth, roles (6) + SCRUM-31 setup | US03, US04: salles, availability (10) | user/role model and `salle` table, agreed on day 1 |
| 2 (20 pts) | US05, US11: booking flow, profile edit (10) | US06, US12: overlap, capacity, durée, tampon as pure functions in `src/domain/` (10) | `validateReservation(...)` signature |
| 3 (15 pts) | US14, US07, US08: tarifs, prix, paiement, reçu (10) | US09, US13: planning du jour, mes réservations (5), then an extension | `computePrice(...)` signature, read-only queries on réservations |

### Per story (each developer, with their agent)

1. Move the story to **In Progress**, assign yourself.
2. Branch from fresh `main`: `SCRUM-<n>-short-name`.
3. Start the agent on the story: "Work SCRUM-<n> following AGENTS.md." It reads the issue, writes one failing test per criterion, implements, runs the suite.
4. **Read and understand the diff yourself before opening the PR.** At the defense the teacher will ask either of you about any part of the code, and "discussion" is a fifth of the grade.
5. Open the PR with the template filled in. Move the story to **In Review**. Log hours on the sub-tasks.

### Review (the other member)

1. Run your own agent on the PR as first pass: "Review PR #<n> against SCRUM-<n> following the review section of AGENTS.md." Claude reviews Codex's code and Codex reviews Claude's, so each model checks the other's blind spots.
2. Read the diff and the findings yourself, then comment, request changes, or approve in GitHub. The human approval is the peer review the Definition of Done requires.
3. Merge (squash) once CI is green.

### Acceptance (PO)

PO pulls `main`, runs it locally from a clean database, walks every acceptance criterion, and records the result in the sprint notes' acceptance-test table. Pass → **Done**. Fail → back to In Progress with a comment saying which criterion failed.

### Daily sync (5 min, chat or call)

What I finished, what I'm doing next, what blocks me, and whether I touched a shared contract. The SM adds anything notable (blockers, decisions) to the sprint notes under Difficulties.

### Sprint review + retrospective (end of sprint, ~1h)

1. Demo every Done story on a local run of `main`.
2. PO lists accepted / rejected; unfinished stories go back to the backlog with their remaining points.
3. SM screenshots the burndown (Reports → Burndown Chart) into `docs/sprints/sprint-N-burndown.png`, exports the sub-task list for the Sprint Backlog table, then closes the sprint in Jira.
4. Retro: keep / change / try, into the sprint notes.

## 5. Where the report comes from

| Report part | Source |
| :--- | :--- |
| Ch.1 Part 1: members, roles, contributions | Roles table above + Jira assignees + `git shortlog -sn` |
| Ch.1 Part 2: vision, actors, final Product Backlog | Spec + `AGENTS.md` Domain + Jira backlog export |
| Ch.1 Part 3: working agreements, tools | This file + `docs/adr/` |
| Ch.2–4 Analysis | `docs/sprints/sprint-N.md` §1 |
| Ch.2–4 Design | StarUML diagrams in `docs/uml/`, mockups in `docs/mockups/` |
| Ch.2–4 Implementation | Sprint notes §3, Jira sub-task export, ADRs, code excerpts |
| Ch.2–4 Testing | CI output + acceptance-test table |
| Sprint Review + burndown | Sprint notes + Jira screenshot |

The course lists StarUML, Enterprise Architect, or Modelio for UML. An agent can draft a diagram as PlantUML or Mermaid to get you started, but draw the final version in one of those tools.

## 6. Before Sprint 1 planning

The Sprint 1 PO reviews *Paramètres du centre* in `backlog.md` (opening hours, max duration, temps tampon, compatibility table). Those values are proposals; once the PO confirms them, the acceptance criteria and tests depend on them, so change them only through a backlog update.
