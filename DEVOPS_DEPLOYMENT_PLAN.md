# 🚀 DevOps Deployment Script - AI Study Buddy to GitHub

## Confirmed Setup:
✅ **Repository name:** ai-study-buddy
✅ **GitHub username:** ShaikShaguffthaAfreen
✅ **Visibility:** PUBLIC
✅ **Branch:** main

---

## 📋 STEP 1: Check Git Status

```powershell
cd c:\Users\Afreen\Project1
git status
```

**Expected:** "Not a git repository" (we'll initialize it)

---

## 📋 STEP 2: Initialize Git Repository

```powershell
git init
git config user.name "ShaikShaguffthaAfreen"
git config user.email "your-email@gmail.com"
```

---

## 📋 STEP 3: Verify .gitignore (Already exists ✅)

The .gitignore file is properly configured to ignore:
- node_modules/
- .next/
- .env files
- IDE files
- OS files

---

## 📋 STEP 4: Stage All Files

```powershell
git add .
```

---

## 📋 STEP 5: Create Initial Commit

```powershell
git commit -m "Initial commit – full working application"
```

---

## 📋 STEP 6: Check GitHub CLI Installation

```powershell
gh --version
```

**If not installed:** Download from https://cli.github.com/

---

## 📋 STEP 7: Authenticate with GitHub CLI

```powershell
gh auth login
```

Follow the prompts:
- Select: GitHub.com
- Select: HTTPS
- Authenticate with your browser

---

## 📋 STEP 8: Create PUBLIC Repository on GitHub

```powershell
gh repo create ai-study-buddy --public --source=. --remote=origin --push
```

This will:
✅ Create a new PUBLIC repository
✅ Push all code automatically
✅ Set origin remote

---

## 📋 VERIFICATION

After pushing, verify at:
```
https://github.com/ShaikShaguffthaAfreen/ai-study-buddy
```

You should see:
- ✅ All project files
- ✅ Proper README.md
- ✅ GREEN "Public" badge
- ✅ Commit message: "Initial commit – full working application"

---

## 🎯 DEPLOYMENT SUMMARY

| Step | Action | Status |
|------|--------|--------|
| 1 | Initialize git | ✅ Ready |
| 2 | Verify .gitignore | ✅ Verified |
| 3 | README.md ready | ✅ Complete |
| 4 | Stage files | ⏳ Pending |
| 5 | Create commit | ⏳ Pending |
| 6 | GitHub CLI check | ⏳ Pending |
| 7 | Authenticate | ⏳ Pending |
| 8 | Create repo & push | ⏳ Pending |

---

## 🚀 EXECUTE IMMEDIATELY

Run this complete command in PowerShell:

```powershell
cd c:\Users\Afreen\Project1; `
git init; `
git config user.name "ShaikShaguffthaAfreen"; `
git config user.email "your-email@gmail.com"; `
git add .; `
git commit -m "Initial commit – full working application"; `
Write-Host "Git repository ready. Now authenticate with GitHub CLI:"; `
gh auth login
```

After authentication completes, run:

```powershell
gh repo create ai-study-buddy --public --source=. --remote=origin --push
```

---

**Total time: ~5 minutes**
**Result: PUBLIC GitHub repository with all code** ✅
