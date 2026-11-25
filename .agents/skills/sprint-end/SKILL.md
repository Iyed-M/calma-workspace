---
name: sprint-end
description: Close the active sprint - compile the sprint review, Sprint Backlog with hours, acceptance results and velocity, collect the retrospective, move unfinished work, close the sprint in Jira.
disable-model-invocation: true
---

# Sprint end

Read `docs/agent/scrum.md` first. Run `date -Iseconds` and keep the start time. The Scrum Master normally runs this; if the human is not SM, say so and continue only if they confirm.

1. **Gather** from Jira for the active sprint:
   - every story with status, points and assignee;
   - every sub-task with assignee, Original Estimate and time logged (worklogs);
   - the PO's acceptance comments;
   - the story notes in `docs/sprints/sprint-<N>/`.

   Compute: points committed, points Done (velocity), stories not Done.

2. **Burndown.** Ask the human to save the Jira burndown screenshot (Reports → Burndown chart) as `docs/sprints/sprint-<N>/burndown.png`. Jira's API doesn't expose that chart, so this is the one manual step. Wait until the file exists.

3. **Gate: carry-over and retrospective.** Ask in French, in one message:
   - for each story not Done: move it to the next sprint, or back to the backlog?
   - the retrospective: for each member, what to keep, what to change, what to try next sprint (the human collects their teammate's answers).

   Write the retrospective in their words; you may correct grammar.

4. **Write the sprint review** on a branch `sprint-<N>-revue` from fresh `main`, filling `docs/sprints/sprint-<N>/README.md` sections Implementation, Testing, Sprint Review and Retrospective:
   - Sprint Backlog table (sub-task, story, owner, estimated h, logged h);
   - acceptance table compiled from the PO comments;
   - test counts from `pnpm test` and `pnpm test:e2e`;
   - difficulties gathered from the story notes;
   - velocity, accepted and rejected stories, the burndown image.

   Commit, push, and open the PR `Sprint <N> — revue` with the other member as reviewer.

5. **Close in Jira.** Move the carried-over stories as decided. Close the sprint with `manageJiraSprint` `close`. Log the elapsed time on a story of the sprint (comment « Revue et rétrospective du sprint <N> »).

6. **Report.** Give the human the velocity, what was accepted, the PR link, and the next step: the next sprint's PO runs `sprint-start`.
