---
name: daily
description: Write your daily stand-up message from Jira and git (done, next, blockers), ready to paste to your teammate.
disable-model-invocation: true
---

# Daily

Read `docs/agent/scrum.md` first.

1. **Collect the facts since the last working day**, for the human only:
   - commits: `git fetch && git log --all --author=<login> --since=<last working day>`;
   - PRs opened, merged, reviewed: `gh pr list --state all --search "involves:<login> updated:>=<date>"`;
   - Jira changes: JQL `project = SCRUM AND (assignee = currentUser() OR reporter = currentUser()) AND updated >= -1d`.
2. **Next**: what `.agents/skills/next/SKILL.md` step 3 would pick for the human.
3. **Blockers**: PRs waiting for review more than 24 h, red CI, questions waiting for the PO, and shared contracts changed in `docs/architecture.md` since yesterday.
4. **Write the message** in French, at most 5 lines: « Hier », « Aujourd'hui », « Bloquants », « Contrats partagés modifiés ». Put only facts from steps 1–3 in it. Done when the human has the message.
