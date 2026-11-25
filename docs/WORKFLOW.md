# How we work

The agents do the Scrum work: Jira, branches, code, tests, PRs, sprint notes. Each of us runs a few commands and makes three kinds of decision. In Claude Code a command is `/next`; in Codex it is `$next`.

## The one command to remember

**`/next`** (Codex: `$next`) looks at Jira and GitHub, decides what you should do now, says it in one line, and does it. Run it whenever you sit down to work, and again when it finishes.

The other commands, if you want to pick yourself:

| Command | When | Who |
| :--- | :--- | :--- |
| `/sprint-start` | Beginning of a sprint | The sprint's PO |
| `/story SCRUM-5` | Build a story, or fix it after review | The story's owner |
| `/review-pr 12` | Review the other member's PR | The other member |
| `/accept` | Validate merged stories | The sprint's PO |
| `/daily` | Each morning; paste the result to your teammate | Both |
| `/sprint-end` | Last day of the sprint | The sprint's SM |

## Your decisions

The agent stops and asks you a question at these points. Answer in a few words.

1. **Sprint plan** (`/sprint-start`): « Le plan vous convient ? ». Check it with your teammate first.
2. **PR verdict** (`/review-pr`): « Approuver, ou demander des changements ? ». Read the summary and the 2–3 places it points you to.
3. **Acceptance** (`/accept`, PO only): accept or reject each story.
4. **Retrospective** (`/sprint-end`): what each of you would keep, change, and try. It's written in your words, so say what you actually think.

The agent also asks when an acceptance criterion is unclear; the PO decides.

**Read the code before you approve it.** `/story` ends with a short walkthrough of what it built and `/review-pr` points you to the places worth reading. At the defense the teacher can ask either of you about any part of the code.

## The one manual step

At `/sprint-end`, save the Jira burndown (Reports → Burndown chart) as `docs/sprints/sprint-<N>/burndown.png`. Jira's API doesn't expose it.

## Typical day

1. `/daily` → paste the message to your teammate.
2. `/next` → usually reviews your teammate's PR first (unblocking them comes first), then continues your story.
3. When `/story` finishes, read its walkthrough. Your teammate's `/next` will pick up the review.

## Calendar

| Weeks | Sprint | PO | SM |
| :--- | :--- | :--- | :--- |
| 1–2 (Nov 24 → Dec 8) | **Sprint 1**: accounts, auth, salles, availability (US01–US04) | Iyed | teammate |
| 3–4 | **Sprint 2**: booking, overlap, capacity / duration / buffer, profile (US05, US06, US11, US12) | teammate | Iyed |
| 5–6 | **Sprint 3**: tarifs, price, payment + reçu, planning, mes réservations (US07–US09, US13, US14), then extensions | Iyed | teammate |
| 6 (end) | Report and 10-minute defense rehearsal | | |

## One-time setup

**Both:** `gh auth login`, then:

```bash
git clone https://github.com/Iyed-M/calma-workspace && cd calma-workspace
pnpm install && pnpm exec playwright install chromium
cp .env.example .env.local     # set BETTER_AUTH_SECRET: pnpm dlx @better-auth/cli secret
pnpm db:up && pnpm db:migrate && pnpm test && pnpm test:e2e
```

**Claude Code:** the skills (`.claude/skills` → `.agents/skills`) and permissions (`.claude/settings.json`) come with the repo. Connect Atlassian once with `/mcp`.

**Codex:** trust the folder when Codex asks (that loads `.codex/config.toml`), then run `codex mcp login atlassian` once. Skills load from `.agents/skills`; `/skills` lists them.

The first time `/next` runs for the teammate, it asks for their GitHub login and saves it in `docs/agent/scrum.md`.

## Where the report material ends up

| Report part | File |
| :--- | :--- |
| Ch.1 members, roles, contributions | `docs/agent/scrum.md` roles + Jira assignees + `git shortlog -sn` |
| Ch.1 vision, actors, Product Backlog | `Calma-WorkSpace-Scrum-Project.md`, `backlog.md` |
| Ch.1 working agreements, tools | this file, `docs/adr/` |
| Ch.2–4, one per sprint | `docs/sprints/sprint-<N>/README.md` + the `SCRUM-<n>.md` story notes next to it |
| Acceptance screenshots | `docs/evidence/SCRUM-<n>/` |
| UML (StarUML), mockups | `docs/uml/`, `docs/mockups/` (drawn by you; an agent can draft PlantUML to start from) |
