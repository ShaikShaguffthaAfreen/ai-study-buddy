# ════════════════════════════════════════════════════════════════════
# AI STUDY BUDDY - GITHUB SYNC SCRIPT
# Syncs application with GitHub repository
# ════════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  AI STUDY BUDDY - GITHUB SYNC                                 ║" -ForegroundColor Cyan
Write-Host "║  Syncing with: ShaikShaguffthaAfreen/ai-study-buddy           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Navigate to project
Set-Location c:\Users\Afreen\Project1

# Check if git is installed
try {
    $gitVersion = git --version 2>$null
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed" -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Step 1: Initialize
Write-Host "[1/7] Initializing git repository..." -ForegroundColor Yellow
git init
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 2: Configure
Write-Host "[2/7] Configuring git user..." -ForegroundColor Yellow
git config --global user.name "ShaikShaguffthaAfreen"
git config --global user.email "your-email@example.com"
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 3: Add files
Write-Host "[3/7] Adding all files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 4: Commit
Write-Host "[4/7] Creating initial commit..." -ForegroundColor Yellow
git commit -m "chore: AI Study Buddy - Initial project setup"
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 5: Add remote
Write-Host "[5/7] Adding GitHub remote..." -ForegroundColor Yellow
git remote add origin https://github.com/ShaikShaguffthaAfreen/ai-study-buddy.git
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 6: Rename branch
Write-Host "[6/7] Renaming branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 7: Push
Write-Host "[7/7] Pushing code to GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 When prompted for authentication:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "2. Click: Generate new token (classic)" -ForegroundColor White
Write-Host "3. Select: repo and workflow" -ForegroundColor White
Write-Host "4. Copy token and paste when prompted" -ForegroundColor White
Write-Host ""

git push -u origin main

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    SYNC COMPLETE!                             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Your repository is now synced!" -ForegroundColor Green
Write-Host ""
Write-Host "Verify at:" -ForegroundColor Yellow
Write-Host "https://github.com/ShaikShaguffthaAfreen/ai-study-buddy" -ForegroundColor Cyan
Write-Host ""
