# Git Branch Workflow — Short Guide

## Branch Structure

```text
main
  ↓
changes
  ├── deepak
  ├── manish
  └── sahil
```

- `main` → Final/stable code.
- `changes` → Common development branch.
- Personal branches (`deepak`, `manish`, `sahil`) → Each person's own work.

## New Member / New Branch

Create the personal branch from the latest `changes`:

```bash
git fetch origin
git checkout changes
git pull origin changes
git checkout -b manish
git push -u origin manish
```

## Daily Work

Work on your own branch:

```bash
git checkout manish
```

After making changes:

```bash
git add .
git commit -m "Add login feature"
git push
```

## Get Latest Changes

If new work has been merged into `changes`, update your branch:

```bash
git fetch origin
git checkout manish
git merge origin/changes
```

If there is a conflict, resolve it, then:

```bash
git add .
git commit -m "Resolve merge conflict"
git push
```

## Send Work to Team

When your feature is complete:

```text
manish → Pull Request → changes
```

On GitHub:

```text
base: changes
compare: manish
```

After review/approval, merge the PR into `changes`.

## Important Rules

1. Do not directly push personal work to `main`.
2. Do not directly push personal work to `changes` if team review is required.
3. Keep your own work on your personal branch.
4. Before starting/continuing work, bring the latest `changes` into your branch.
5. Approval is required for merging a Pull Request, not for every `git push`.
