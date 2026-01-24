# 🚀 QUICK START - Create GitHub Repository (5 MINUTES)

## ⚡ STEP 1: Download & Install Git (2 min)

**Windows Users:**
1. Go to: https://git-scm.com/download/win
2. Click "Click here to download" 
3. Run the .exe file
4. Click "Next" several times (accept defaults)
5. Click "Install"
6. **CLOSE and REOPEN PowerShell completely**

Verify Git installed:
```powershell
git --version
```

---

## ⚡ STEP 2: Initialize Local Repository (Paste this in PowerShell)

```powershell
cd c:\Users\Afreen\Project1

git init

git config --global user.name "Your Name Here"
git config --global user.email "your.email@gmail.com"

git add .

git commit -m "chore: AI Study Buddy - Initial project setup"
```

You'll see green output. ✅

---

## ⚡ STEP 3: Create Repository on GitHub (3 min)

1. Open: https://github.com/new
2. Fill in:
   - **Repository name:** `ai-study-buddy`
   - **Description:** `Offline-first AI learning companion with optional cloud AI integration`
   - **Visibility:** Select **PUBLIC**
   - Leave other options as default
3. Click **"Create repository"**

You'll see a page with git commands. COPY THIS LINE:
```
https://github.com/YOUR_USERNAME/ai-study-buddy.git
```

---

## ⚡ STEP 4: Push Code to GitHub (Paste in PowerShell)

```powershell
git remote add origin https://github.com/YOUR_USERNAME/ai-study-buddy.git

git branch -M main

git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username**

GitHub might ask for password - create a Personal Access Token:
1. Go: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "ai-study-buddy"
4. Select: `repo` and `workflow`
5. Click "Generate token"
6. Copy the token
7. Paste it when PowerShell asks for password

---

## ✅ DONE!

Your public repository is now at:
```
https://github.com/YOUR_USERNAME/ai-study-buddy
```

Share this link with:
- Your professor
- Your college
- Friends/portfolio

---

## 🆘 If You Get Stuck

**Error: "git not found"**
- Git not installed properly
- Download and install from: https://git-scm.com/download/win
- Restart PowerShell after installing

**Error: "remote origin already exists"**
```powershell
git remote remove origin
# Then run the push commands again
```

**Error: "access denied"**
- Use Personal Access Token (not password)
- Generate: https://github.com/settings/tokens

---

**That's it! Your project is now on GitHub!** 🎉
