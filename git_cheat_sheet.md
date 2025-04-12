
# Git Commands Cheat Sheet

## 1. **Basic Commands**
- **Initialize a new repository**:
  ```bash
  git init
  ```
- **Check the status of your repository**:
  ```bash
  git status
  ```

## 2. **Working with Files**
- **Add changes to staging area**:
  ```bash
  git add .
  ```
- **Commit changes with a message**:
  ```bash
  git commit -m "Your commit message"
  ```

## 3. **Working with Branches**
- **Create a new branch**:
  ```bash
  git checkout -b new-branch
  ```
- **Switch to an existing branch**:
  ```bash
  git checkout existing-branch
  ```
- **List all branches**:
  ```bash
  git branch
  ```

## 4. **Pushing Changes**
- **Push changes to the remote repository** (in the current branch):
  ```bash
  git push
  ```
- **Push changes to a specific branch (first time)**:
  ```bash
  git push -u origin branch-name
  ```
- **Push changes to the main branch**:
  ```bash
  git push origin main
  ```

## 5. **Pulling Changes**
- **Pull the latest changes from the remote repository**:
  ```bash
  git pull origin branch-name
  ```

## 6. **Fetching Remote Updates**
- **Fetch updates from the remote without merging**:
  ```bash
  git fetch origin
  ```

## 7. **Merging Changes**
- **Merge changes from another branch into your current branch**:
  ```bash
  git merge branch-name
  ```

## 8. **Handling Conflicts**
- **Show differences between local changes and the latest commit**:
  ```bash
  git diff
  ```
- **Abort the merge process**:
  ```bash
  git merge --abort
  ```

## 9. **Remote Repositories**
- **Add a remote repository**:
  ```bash
  git remote add origin <url>
  ```
- **Show remotes**:
  ```bash
  git remote -v
  ```

## 10. **Other Useful Commands**
- **Check log of commits**:
  ```bash
  git log
  ```
- **Undo the last commit** (keeps changes in working directory):
  ```bash
  git reset --soft HEAD~1
  ```
- **Undo changes in a file**:
  ```bash
  git checkout -- filename
  ```
- **Remove a file from staging (but keep locally)**:
  ```bash
  git reset filename
  ```

---

## Example Workflow for Backend Repository

1. **Create a new branch**:
   ```bash
   git checkout -b dev
   ```

2. **Add and commit changes**:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

3. **Push changes to the `dev` branch**:
   ```bash
   git push -u origin dev
   ```

4. **Switch back to the `main` branch and pull latest changes**:
   ```bash
   git checkout main
   git pull origin main
   ```

5. **Push changes to the `main` branch**:
   ```bash
   git push origin main
   ```

## Notes

- Always make sure to **commit** before **pushing**.
- Use **`git pull`** to keep your local repository up-to-date with the remote.
- Use **branches** to separate different features or tasks.

