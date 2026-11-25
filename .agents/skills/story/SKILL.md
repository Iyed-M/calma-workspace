---
name: story
description: Build a Jira story end to end (Jira updates, branch, unit and acceptance tests, code, report notes, PR), or resume one after review feedback.
disable-model-invocation: true
argument-hint: "[SCRUM-<n>]"
---

# Story

Read `docs/agent/scrum.md` first. Run `date -Iseconds` and keep the start time.

1. **Resolve the story.** Use the argument, or else the story assigned to the human that is In Progress, or else run the selection in `.agents/skills/next/SKILL.md` step 3. Fetch the issue with its sub-tasks, its sprint, and any PR on its branch (`gh pr list --search SCRUM-<n>`).

2. **Start or resume.**
   - PR with changes requested: check out the branch, pull, and go to step 8.
   - Branch already exists: check it out, pull, and continue from what the story notes say is left.
   - Otherwise: assign the story to the human, transition it to In Progress, then `git switch main && git pull && git switch -c SCRUM-<n>-<slug>`. Create `docs/sprints/sprint-<N>/SCRUM-<n>.md` from `docs/sprints/_story-template.md`. If the story has no sub-tasks, create 3–6 with an assignee and an estimate in hours.

3. **Clarify.** List the acceptance criteria and the test that will prove each one. If a criterion is missing or ambiguous, ask the PO: the human, if they are PO this sprint; otherwise post a Jira comment to the PO and ask the human to relay the question. Done when every criterion maps to a planned test.

4. **Build.** Follow AGENTS.md *Working a story*: one failing Jest test per rule (business rules as pure functions in `src/domain/`), then implement until green. Commit in small steps. A changed shared contract goes into `docs/architecture.md` in the same branch; a technical decision gets an ADR.

5. **Acceptance tests.** Write `e2e/SCRUM-<n>.spec.ts` with one test per criterion, titled `AC<k> — <criterion>`. Each UI test ends with `evidence(page, "SCRUM-<n>", "AC<k>")`. A server-only criterion (e.g. an API call that must be refused) uses Playwright's `request` and needs no screenshot. Run `pnpm test:e2e e2e/SCRUM-<n>.spec.ts`. Open each screenshot and check it actually shows what the criterion says. Done when every test passes and every UI criterion has a matching screenshot.

6. **Full check.** `pnpm check:fix && pnpm typecheck && pnpm test && pnpm test:e2e`. Done when all four pass.

7. **Story notes.** Fill `docs/sprints/sprint-<N>/SCRUM-<n>.md` in French: sub-tasks with owner and hours, technical choices (link ADRs), 1–3 code excerpts worth showing (file:line and why), difficulties met and how they were solved, test counts, and the criterion → test → evidence table.

8. **PR.**
   - New: push, then `gh pr create` with title `SCRUM-<n> <titre>`, the template filled (criterion → test table, shared-contract line), and the other member as `--reviewer`.
   - After review: handle every review comment (fix it, or reply with the reason you didn't), rerun step 6, push, and re-request review with `gh pr edit <n> --add-reviewer <login>`.

9. **Jira.** Transition to In Review. Comment in French with the PR link, a two-line summary, and the list of acceptance tests. Transition the finished sub-tasks to Done. Log the elapsed time since the start on the sub-tasks worked on. Done when Jira shows In Review, the PR link, and the worklog.

10. **Hand off.** Give the human the PR link and a short walkthrough of the change: the files that matter, the core logic, and the 2–3 places a reviewer or the teacher is most likely to ask about. Tell them their teammate will pick up the review with `next`.
