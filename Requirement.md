# Git & GitHub Team Workflow — Lease Project

This file explains how every team member should connect the repository to their IDE, create and use branches, pull updates, commit changes, and push code safely.

---

## 1. Repository

GitHub Repository:

`https://github.com/sahil-chand-21/lease-project`

### Main team branches

- `main` → stable/default branch
- `changes` → team development/integration branch
- Personal branches → each developer works separately, for example:
  - `deepak`
  - `sahil`
  - `manish`
  - `bhavesh`

**Do not directly develop on `main`.**

---

# 2. First Time: Attach Repository to Your IDE

Open VS Code (or another Git-enabled IDE) and open the terminal.

Clone the repository:

```bash
git clone https://github.com/sahil-chand-21/lease-project.git
```

Enter the project:

```bash
cd lease-project
```

Check the remote:

```bash
git remote -v
```

You should see the GitHub repository as `origin`.

---

# 3. Check Available Branches

To see local branches:

```bash
git branch
```

To see both local and remote branches:

```bash
git branch -a
```

Before starting work, fetch the latest branch information:

```bash
git fetch origin
```

---

# 4. Create Your Personal Branch

## Recommended: Create your branch from `changes`

First switch to the team development branch:

```bash
git checkout changes
```

Get the latest code:

```bash
git pull origin changes
```

Create your personal branch:

```bash
git checkout -b deepak
```

Replace `deepak` with your own name.

Example:

```bash
git checkout -b manish
```

Then verify:

```bash
git branch
```

The `*` shows your current branch.

Example:

```text
* deepak
  changes
  main
```

---

# 5. If Your Personal Branch Already Exists on GitHub

Do NOT use:

```bash
git checkout -b deepak
```

because `-b` tries to create a new branch.

Instead use:

```bash
git fetch origin
git checkout deepak
```

If Git says the remote branch exists but the local branch does not:

```bash
git checkout -b deepak origin/deepak
```

---

# 6. Daily Working Rule

Before starting work each day:

```bash
git checkout changes
git pull origin changes
git checkout deepak
```

This keeps your personal branch based on the latest team development code.

Then work normally in your IDE.

---

# 7. Check What You Changed

Use:

```bash
git status
```

To see actual code differences:

```bash
git diff
```

---

# 8. Add Your Changes

Add a specific file:

```bash
git add filename
```

Add a folder:

```bash
git add server/src/controllers/
```

Add all changed files:

```bash
git add .
```

Then check:

```bash
git status
```

---

# 9. Commit Your Changes

Create a meaningful commit:

```bash
git commit -m "Add controllers"
```

Other examples:

```bash
git commit -m "Fix login API"
git commit -m "Add lease dashboard"
git commit -m "Update frontend validation"
```

Avoid messages like:

```text
update
changes
final
new
```

Use a message that explains what was changed.

---

# 10. Push Your Personal Branch

For the first push:

```bash
git push -u origin deepak
```

After the branch is connected to the remote, normally:

```bash
git push
```

Your code will be pushed to:

```text
GitHub → deepak branch
```

It will NOT automatically change `main` or `changes`.

---

# 11. Pull — Get Latest Changes

To get the latest code from your current remote branch:

```bash
git pull
```

To specifically update from `changes`:

```bash
git pull origin changes
```

### Important

`git pull` means:

```text
fetch + merge
```

It downloads the latest remote changes and integrates them into your current branch.

---

# 12. Push — Send Your Changes

Basic flow:

```bash
git add .
git commit -m "Describe your changes"
git push
```

Flow:

```text
Your IDE
   ↓
git add
   ↓
git commit
   ↓
git push
   ↓
GitHub personal branch
```

---

# 13. Recommended Team Workflow

Example: Deepak is working on `deepak`.

```text
                 main
                  │
                  ▼
               changes
              /       \
             /         \
        deepak         sahil
           │
        manish
```

Each developer should normally work on their own branch.

Example:

```text
deepak → Deepak's work
sahil  → Sahil's work
manish → Manish's work
```

This prevents developers from directly overwriting each other's work.

---

# 14. How Changes Reach `changes`

After finishing a feature:

```text
deepak branch
      │
      │ push
      ▼
GitHub → deepak
      │
      │ Pull Request
      ▼
changes
```

Create a Pull Request on GitHub:

```text
deepak → changes
```

The team can review the changes and merge them.

---

# 15. After Your Pull Request Is Merged

Once your changes are merged into `changes`, update your local repository:

```bash
git checkout changes
git pull origin changes
```

Then update your personal branch:

```bash
git checkout deepak
git merge changes
```

Now your personal branch contains the latest team changes.

---

# 16. If Someone Else Updated `changes`

Suppose Sahil pushed new code to `changes`.

Before starting new work:

```bash
git checkout changes
git pull origin changes
git checkout deepak
git merge changes
```

This brings Sahil's merged work into your branch.

---

# 17. Merge Conflict

Sometimes two developers edit the same part of the same file.

Git may show:

```text
CONFLICT
```

Do not panic.

First check:

```bash
git status
```

Open the conflicted file in your IDE.

You may see:

```text
<<<<<<< HEAD
Your changes
=======
Other branch changes
>>>>>>> changes
```

Decide which code should remain, or combine both changes.

Remove the conflict markers:

```text
<<<<<<<
=======
>>>>>>>
```

Then:

```bash
git add .
git commit -m "Resolve merge conflict"
```

If you are in the middle of a merge and want to cancel it:

```bash
git merge --abort
```

---

# 18. Important: Untracked Files

If Git shows:

```text
Untracked files:
    server/src/controllers/
```

It means Git has found files that are not currently being tracked.

If those files are your actual code:

```bash
git add server/src/controllers/
git commit -m "Add controllers"
git push
```

If you do not want them in Git, do not blindly use `git add .`.

Check the files first.

---

# 19. Important: "Branch Already Exists"

If you run:

```bash
git checkout -b deepak
```

and get:

```text
fatal: a branch named 'deepak' already exists
```

The branch already exists locally.

Use:

```bash
git checkout deepak
```

If you want to see all branches:

```bash
git branch -a
```

---

# 20. Important: Pull Error About Files Being Overwritten

Example:

```text
error: The following untracked working tree files would be overwritten by merge:
    server/package-lock.json
```

Do not immediately use:

```bash
git reset --hard
```

or:

```bash
git clean -fd
```

because these commands can remove local work.

First inspect:

```bash
git status
```

If the file is important, make a backup before removing or replacing it.

---

# 21. Useful Git Commands

### Current branch

```bash
git branch --show-current
```

### Status

```bash
git status
```

### All branches

```bash
git branch -a
```

### Download remote branch information

```bash
git fetch origin
```

### Switch branch

```bash
git checkout branch-name
```

### Create branch

```bash
git checkout -b branch-name
```

### Pull

```bash
git pull
```

### Add changes

```bash
git add .
```

### Commit

```bash
git commit -m "Your message"
```

### Push

```bash
git push
```

### View commit history

```bash
git log --oneline --graph --all
```

---

# 22. Golden Rule for This Project

Before working:

```bash
git checkout changes
git pull origin changes
git checkout YOUR-BRANCH
```

After working:

```bash
git status
git add .
git commit -m "Describe your changes"
git push
```

Then create a Pull Request:

```text
YOUR-BRANCH → changes
```

After the Pull Request is merged:

```bash
git checkout changes
git pull origin changes
git checkout YOUR-BRANCH
git merge changes
```

---

# 23. Simple Team Flow

```text
          GitHub Repository
                 │
                 ▼
               main
                 │
                 ▼
              changes
            /    |    \
           /     |     \
       deepak  sahil  manish
          │       │      │
          ▼       ▼      ▼
        Code    Code    Code
          │       │      │
          └── Push ──────┘
                 │
                 ▼
           Pull Request
                 │
                 ▼
              changes
                 │
                 ▼
              main
```

## Remember

**Pull = GitHub se code lena**

**Push = Apna code GitHub par bhejna**

**Commit = Apne local changes ka saved Git version**

**Branch = Alag workspace/version line**

**Merge = Ek branch ke changes ko doosri branch me combine karna**

**Pull Request = GitHub par changes ko review karke target branch me merge karne ka process**
