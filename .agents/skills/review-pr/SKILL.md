---
name: review-pr
description: Review the other member's PR (tests, acceptance criteria, Definition of Done), get your verdict, then approve and merge or request changes, and update Jira.
disable-model-invocation: true
argument-hint: "[PR number]"
---

# Review PR

Read `docs/agent/scrum.md` first. Run `date -Iseconds` and keep the start time.

1. **Resolve the PR.** Use the argument, or else the open PR that requests the human's review. If the human authored it, stop: a review must come from the other member. `gh pr checkout <n>`, `pnpm install`, and fetch the Jira story named in the branch (sprint PRs have none).

2. **Run everything.** `pnpm check && pnpm typecheck && pnpm test && pnpm test:e2e`, then `gh pr checks <n>`. For a docs-only sprint PR, `pnpm check` is enough.

3. **Review.** Apply AGENTS.md *Reviewing a teammate's PR* to the diff (`gh pr diff <n>`):
   - every acceptance criterion is implemented, has a test, and, for UI criteria, has a screenshot in `docs/evidence/` that shows it;
   - every Definition of Done item that can be checked before acceptance;
   - a shared-contract change is flagged in the PR and written in `docs/architecture.md`;
   - the story notes file is filled.

   Done when each criterion and each DoD item has a verdict, and each finding has a file:line and a concrete failure scenario.

4. **Gate: PR verdict.** Show the human, in French: what the PR does (≤ 5 lines), the test results, the findings ranked by severity, and the 2–3 places in the code worth reading themselves. Ask: « Approuver, ou demander des changements ? » Use the human's words for the review comment; keep only the findings they keep.

5. **Apply.**
   - **Approve**: `gh pr review <n> --approve --body "<verdict>"`. Once checks are green, `gh pr merge <n> --squash --delete-branch`. For a story PR, add the label `a-valider` in Jira and comment « Fusionnée dans main (PR #<n>), en attente de validation par le PO ».
   - **Changes**: `gh pr review <n> --request-changes --body "<findings>"`, and comment the same on the Jira story.

6. **Finish.** Log the elapsed time on the story (comment « Revue de code PR #<n> »). `git switch main && git pull`. Tell the human what happens next: the PO runs `accept`, or the author runs `next` to fix the requested changes.
