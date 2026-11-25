---
name: accept
description: Product Owner acceptance - run the acceptance tests on main from a clean database, show the evidence, and record your accept/reject decision in Jira.
disable-model-invocation: true
argument-hint: "[SCRUM-<n>]"
---

# Accept

Read `docs/agent/scrum.md` first. Run `date -Iseconds` and keep the start time.

1. **Check the role.** Only the PO of the active sprint accepts stories. Otherwise, name the PO and stop.

2. **Collect the stories**: the argument, or else every story of the active sprint with the label `a-valider`.

3. **Run on a clean main.** `git switch main && git pull && pnpm install && pnpm db:reset`, then `pnpm db:seed` if that script exists, then the full `pnpm test:e2e` (it also catches regressions in stories already Done).

4. **Build the evidence** for each story: criterion → test → result → screenshot. Open each screenshot and check that it shows what the criterion says. Flag any criterion that is untested, failing, or whose screenshot doesn't match.

5. **Gate: acceptance.** Present each story's table in French and ask, for all stories at once: « Pour chaque story : valider (oui) ou refuser (non + critère et raison) ? »

6. **Apply in Jira.**
   - **Accepted**: remove the label `a-valider`, transition to Done, and comment « Validée par le PO (<nom>) le <date> », followed by the criterion → test → result table.
   - **Rejected**: remove the label, transition to In Progress, reassign to the author, and comment with the failed criterion and the PO's reason.

7. **Finish.** Log the elapsed time on the stories reviewed (comment « Validation PO »). Tell the human which stories are Done and what is left in the sprint.
