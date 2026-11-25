# Scrum reference for agents

Every workflow skill in `.agents/skills/` reads this file first. It holds facts and rules; the skills hold the steps.

## Who am I

At the start of every skill, resolve the human you work for: `gh api user --jq .login` and Atlassian `atlassianUserInfo`, matched against the Team table. Then read their role for the current sprint. If a GitHub login in the table is `?`, ask the human for it and write it in.

## Team

| Member | Agent | GitHub | Jira accountId |
| :--- | :--- | :--- | :--- |
| Iyed | Claude Code | `Iyed-M` | `712020:1eab5a48-204d-4430-a8e6-f7eb4d070f78` |
| jmalmohamedamine1 | Codex | `?` | `712020:b6a414a4-952a-4d71-a622-578827bd7ec2` |

| Sprint | Jira sprint id | Product Owner | Scrum Master |
| :--- | :--- | :--- | :--- |
| 1 | 1 | Iyed | jmalmohamedamine1 |
| 2 | 3 | jmalmohamedamine1 | Iyed |
| 3 | 4 | Iyed | jmalmohamedamine1 |

Both members are developers in every sprint. The PO runs `accept`; the SM runs `sprint-end`.

Suggested split, which `sprint-start` refines (Iyed / teammate, and the seam between them):

| Sprint | Iyed | Teammate | Seam |
| :--- | :--- | :--- | :--- |
| 1 | US01, US02: accounts, auth, roles, seeded staff accounts | US03, US04: salles, availability | `user` table with `role` and `profil`; land it first so US03 can restrict to the gérant |
| 2 | US05, US11: booking flow, profile edit | US06, US12: overlap, capacity, durée, tampon as pure functions in `src/domain/` | `validateReservation(...)` signature |
| 3 | US14, US07, US08: tarifs, price, payment, reçu | US09, US13: planning du jour, mes réservations, then an extension | `computePrice(...)` signature; read-only queries on réservations |

## Jira

- Site `medjmalami.atlassian.net`, cloudId `66d023e7-b836-44a8-b840-d67d91f10d9a`, project `SCRUM`, board id `1` (team-managed Scrum).
- Fields: story points = `Story point estimate` (`customfield_10016`); sprint = `customfield_10020`. Sub-task issue type is `Subtask`.
- Epics are the backlog themes: SCRUM-14 Comptes et profils, SCRUM-15 Gestion des salles, SCRUM-16 Disponibilités, SCRUM-17 Réservation, SCRUM-18 Tarification et paiement, SCRUM-19 Suivi de l'occupation, SCRUM-20 Extensions.
- **Status flow of a story**:

  | State | Jira |
  | :--- | :--- |
  | Not started | To Do |
  | Being built | In Progress, assigned to the developer |
  | PR open | In Review |
  | Merged, waiting for the PO | In Review + label `a-valider` |
  | Accepted by the PO | Done, label removed |
  | Rejected by the PO | In Progress, label removed, comment naming the failed criterion |

  Move statuses with `transitionJiraIssue` (list the issue's transitions first). Never move a story to Done outside `accept`.
- **Sub-tasks**: each story has 3–6, each with an assignee and an Original Estimate in hours. They are the report's Sprint Backlog table (task, owner, hours).
- **Worklogs**: at the start of a skill run `date -Iseconds`; at the end, log the elapsed time (rounded to 15 min) on the sub-tasks or story you worked on, as the human you work for. The time is the real duration of the session. Never estimate or invent logged time.
- Write everything in Jira in French.

## GitHub

- Repo `Iyed-M/calma-workspace`. `main` is protected: PR, 1 approval from the other member, green CI.
- Branch `SCRUM-<n>-<slug>`; PR title `SCRUM-<n> <titre de la story>`; PR body = `.github/pull_request_template.md`, filled.
- Merge with `gh pr merge <n> --squash --delete-branch`, only after an approval from the other member and green checks.
- Documentation-only changes (sprint planning, sprint review) also go through a PR, titled `Sprint <N> — <planification|revue>`.

## Human gates

Three decisions belong to a human. At a gate you present the evidence, ask one short question in French, and wait for the answer in the chat. Record the answer as given; a question left unanswered blocks the step.

1. **PR verdict** (`review-pr`, the reviewer): approve or request changes.
2. **Acceptance** (`accept`, the PO): accept or reject each story.
3. **Sprint decisions** (`sprint-start`, `sprint-end`): the sprint plan, carry-over, and the retrospective. The retrospective comes from the humans' own words; collect them, don't write them.

Also ask the PO whenever an acceptance criterion is missing or ambiguous: acceptance criteria belong to the PO.

## Guardrails

Stay on branches and PRs: `main` changes only through a merged PR, history is never rewritten on a branch the other member pushed to, and merges never use `--admin`. Jira issues are never deleted. Sprints start and close only after the sprint gate's answer.

## Report material

The report is written in French from these files, so keep them current as you work:

| Path | Written by | Content |
| :--- | :--- | :--- |
| `docs/sprints/sprint-<N>/README.md` | `sprint-start`, `sprint-end` | Goal, roles, stories, split, Sprint Backlog, review, retro, velocity, burndown (from `docs/sprints/_template.md`) |
| `docs/sprints/sprint-<N>/SCRUM-<n>.md` | `story` | Per-story analysis, design, implementation, tests, difficulties (from `docs/sprints/_story-template.md`) |
| `docs/evidence/SCRUM-<n>/AC<k>.png` | acceptance tests | Screenshot proving each acceptance criterion |
| `docs/architecture.md`, `docs/adr/` | `story`, `sprint-start` | Shared contracts and technical decisions |
