---
name: next
description: Work out what you should do now (a review waiting, a story to start or fix, stories to accept, a sprint to plan or close) and do it.
disable-model-invocation: true
---

# Next

Read `docs/agent/scrum.md` first.

1. **Who and when.** Resolve the human and their role in the active sprint (scrum.md → Who am I).
2. **Gather state** in one pass:
   - sprints of board 1 (`listJiraBoardSprints`): the active one and its end date;
   - stories of the active sprint with status, assignee and labels: JQL `project = SCRUM AND sprint in openSprints() AND issuetype = Story`;
   - open PRs: `gh pr list --json number,title,author,reviewDecision,reviewRequests,headRefName`.
3. **Pick** the first row that matches:

   | Condition | Skill to run |
   | :--- | :--- |
   | No active sprint | `sprint-start` |
   | The active sprint ends today or has ended | `sprint-end` |
   | A PR by the other member is waiting for my review | `review-pr <n>` |
   | One of my PRs has changes requested, or a story assigned to me has the label `refusee` | `story <its key>` |
   | I am PO and a story has the label `a-valider` | `accept` |
   | A story assigned to me is In Progress | `story <key>` |
   | A To Do story of the sprint is on my side of the split in `docs/sprints/sprint-<N>/README.md` (or unassigned if there is no split yet) | `story <key>` |
   | None of the above | Tell the human the sprint work is done or waiting on the other member, and say what they are waiting for |

4. **Run it.** Tell the human in one line what you picked and why, then read `.agents/skills/<skill>/SKILL.md` and follow it from its first step. Done when that skill is done.
