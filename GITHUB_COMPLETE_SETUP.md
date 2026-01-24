# 🚀 AI Study Buddy - Complete GitHub Repository Setup

## IMPORTANT: First Install Git

If Git is not installed:
1. Download: https://git-scm.com/download/win
2. Run the installer (accept all defaults)
3. Restart PowerShell
4. Verify with: `git --version`

---

## ✅ STEP 1: Initialize Git Locally (Copy & Paste)

Open **PowerShell** and run these commands ONE BY ONE:

```powershell
# Navigate to project
cd c:\Users\Afreen\Project1

# Check git is installed
git --version

# Initialize repository
git init

# Configure git (use your real name and email)
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"

# Add all files
git add .

# Create initial commit
git commit -m "chore: AI Study Buddy - Initial project setup"
```

You should see green checkmarks and "Initial commit created" message.

---

## 📱 STEP 2: Create Repository on GitHub

1. **Go to:** https://github.com/new
2. **Fill in:**
   - Repository name: `ai-study-buddy`
   - Description: `Offline-first AI learning companion with optional cloud AI integration`
   - Visibility: **PUBLIC** ✅
   - Initialize: Leave all unchecked
3. **Click:** "Create repository"

GitHub will show you a screen with commands.

---

## 🔗 STEP 3: Connect to GitHub (Copy Your URL)

After creating the repository, you'll see commands like:

```
git remote add origin https://github.com/YOUR_USERNAME/ai-study-buddy.git
git branch -M main
git push -u origin main
```

**Copy the URL from your GitHub page** (it will have YOUR_USERNAME in it)

---

## 📤 STEP 4: Push Code to GitHub

Paste these commands in PowerShell (replace YOUR_USERNAME):

```powershell
# Add remote repository (paste your URL from GitHub)
git remote add origin https://github.com/YOUR_USERNAME/ai-study-buddy.git

# Rename branch to main
git branch -M main

# Push code to GitHub (enter your GitHub password when prompted)
git push -u origin main
```

**First time:** GitHub might ask for your password or to authenticate
- If it asks: use your GitHub username and create a **Personal Access Token** (not password)
- Generate token: https://github.com/settings/tokens

---

## ✅ VERIFICATION

After pushing, go to: `https://github.com/YOUR_USERNAME/ai-study-buddy`

You should see:
- ✅ All your project files
- ✅ README.md displayed
- ✅ Green "PUBLIC" badge
- ✅ Your commit message

---

## 🎯 FINAL STEPS

### Add Topics (optional but recommended)
1. Go to your repo Settings
2. Find "Topics" section
3. Add: `ai`, `learning`, `nextjs`, `nlp`, `study-buddy`

### Share Your Repository
Your public repo link:
```
https://github.com/YOUR_USERNAME/ai-study-buddy
```

Share this link with:
- Your professor
- Your college
- GitHub community
- Portfolio/Resume

---

## ❓ TROUBLESHOOTING

**"Git not found"**
- Install Git: https://git-scm.com/download/win
- Restart PowerShell

**"fatal: remote origin already exists"**
```powershell
git remote remove origin
# Then add again with your URL
```

**"Access denied"**
- Use Personal Access Token instead of password
- Generate: https://github.com/settings/tokens

**"fatal: could not read Username"**
```powershell
# Use this format with token:
git push -u origin main
# When prompted for password, paste your token
```

---

## 📊 Expected Result

A fully public GitHub repository with:
- ✅ All project code
- ✅ Complete documentation
- ✅ Open for community contributions
- ✅ Ready for GitHub Pages deployment
- ✅ Professional project showcase

---

**Questions?** GitHub Help: https://docs.github.com
