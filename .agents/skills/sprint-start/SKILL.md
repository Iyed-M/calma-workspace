---
name: sprint-start
description: Plan and start the next sprint (goal, roles, work split, sub-tasks, shared contracts, Jira sprint, sprint notes).
disable-model-invocation: true
argument-hint: "[sprint number]"
---

# Sprint start

Read `docs/agent/scrum.md` first. Run `date -Iseconds` and keep the start time.

1. **Locate the sprint.** The target is the argument, or else the lowest-numbered sprint that is not closed. If an earlier sprint is still active, stop and tell the human to run `sprint-end` first. If the target sprint is already active (Sprint 1 was started before planning), plan it in place and skip starting it in Jira.

2. **Gather.**
   - The target sprint's stories in Jira, with points, and their acceptance criteria in `backlog.md`.
   - Stories carried over from the previous sprint, and its velocity (points Done) from `docs/sprints/sprint-<N-1>/README.md`.
   - Roles and the suggested split for this sprint (scrum.md), and `docs/architecture.md`.

3. **Draft the plan** in French, in the chat:
   - the sprint goal, in one sentence;
   - the roles (PO, SM);
   - the stories with points, and the total compared with the last velocity;
   - the split between the two members: vertical slices, balanced points, one clear seam between them, and the order in which pieces must land when one side depends on the other;
   - 3–6 sub-tasks per story, each with an owner and an estimate in hours;
   - the shared contracts this sprint needs (tables and columns, routes or server functions, `src/domain/` function signatures) and who owns each one.

   Done when every story has an owner and estimated sub-tasks, and every seam between the two members has a written contract.

4. **Gate: sprint plan.** Ask: « Le plan vous convient ? (oui / modifications) ». The human confirms for both members after checking with their teammate. Apply modifications and ask again until the answer is yes.

5. **Apply in Jira.**
   - Assign each story to its owner.
   - Create the sub-tasks (`Subtask`, parent = story, assignee, Original Estimate).
   - Set the sprint goal with `manageJiraSprint` `update`, resending the sprint's name and dates so they are kept.
   - If the sprint is not active: `manageJiraSprint` `start` from now for 14 days.

6. **Apply in the repo** on a branch `sprint-<N>-planification` from fresh `main`:
   - `docs/sprints/sprint-<N>/README.md` from `docs/sprints/_template.md`, with the Analysis section filled (goal, roles, stories, split, sub-tasks);
   - the shared contracts in `docs/architecture.md`;
   - the roles table in scrum.md, if the roles changed.

   Commit, push, open the PR `Sprint <N> — planification` with the other member as reviewer.

7. **Log and report.** Log the elapsed time on the sprint's first story (comment « Planification du sprint <N> »). Tell the human: the sprint goal, who does what first, and that each member now runs `next`.
