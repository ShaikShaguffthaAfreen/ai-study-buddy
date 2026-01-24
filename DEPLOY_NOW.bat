@echo off
cls
echo ╔════════════════════════════════════════════════════════════════╗
echo ║   AI STUDY BUDDY - DEVOPS DEPLOYMENT                          ║
echo ║   Initializing Git Repository & Pushing to GitHub             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Close any existing PowerShell instances to refresh PATH
taskkill /F /IM powershell.exe 2>nul
taskkill /F /IM pwsh.exe 2>nul

REM Wait a moment
timeout /t 2 /nobreak

REM Open new PowerShell and run the full deployment
start powershell -NoExit -Command ^
"cd c:\Users\Afreen\Project1; ^
Write-Host 'Verifying Git...' -ForegroundColor Yellow; ^
git --version; ^
Write-Host ''; ^
Write-Host 'Initializing repository...' -ForegroundColor Yellow; ^
git init; ^
git config user.name 'ShaikShaguffthaAfreen'; ^
git config user.email 'afreen@study-buddy.com'; ^
Write-Host 'Repository initialized!' -ForegroundColor Green; ^
Write-Host ''; ^
Write-Host 'Staging files...' -ForegroundColor Yellow; ^
git add .; ^
Write-Host 'Creating commit...' -ForegroundColor Yellow; ^
git commit -m 'Initial commit – full working application'; ^
Write-Host ''; ^
Write-Host '╔════════════════════════════════════════════════════════════════╗' -ForegroundColor Cyan; ^
Write-Host '║  NEXT STEPS:                                                   ║' -ForegroundColor Cyan; ^
Write-Host '╚════════════════════════════════════════════════════════════════╝' -ForegroundColor Cyan; ^
Write-Host ''; ^
Write-Host 'Step 1: Go to https://github.com/new' -ForegroundColor Yellow; ^
Write-Host '  - Repository name: ai-study-buddy' -ForegroundColor White; ^
Write-Host '  - Description: Offline-first AI learning companion' -ForegroundColor White; ^
Write-Host '  - Visibility: PUBLIC' -ForegroundColor Green; ^
Write-Host '  - Click Create Repository' -ForegroundColor White; ^
Write-Host ''; ^
Write-Host 'Step 2: Copy the HTTPS URL from GitHub' -ForegroundColor Yellow; ^
Write-Host '  - Example: https://github.com/ShaikShaguffthaAfreen/ai-study-buddy.git' -ForegroundColor Cyan; ^
Write-Host ''; ^
Write-Host 'Step 3: Run these commands:' -ForegroundColor Yellow; ^
Write-Host '  git remote add origin https://github.com/ShaikShaguffthaAfreen/ai-study-buddy.git' -ForegroundColor Cyan; ^
Write-Host '  git branch -M main' -ForegroundColor Cyan; ^
Write-Host '  git push -u origin main' -ForegroundColor Cyan; ^
Write-Host ''; ^
Write-Host 'Step 4: When asked for password, use Personal Access Token' -ForegroundColor Yellow; ^
Write-Host '  - Go: https://github.com/settings/tokens' -ForegroundColor White; ^
Write-Host '  - Generate new token (classic)' -ForegroundColor White; ^
Write-Host '  - Select: repo and workflow scopes' -ForegroundColor White; ^
Write-Host ''; ^
Write-Host '═══════════════════════════════════════════════════════════════' -ForegroundColor Cyan; ^
Write-Host 'Local git repository is ready!' -ForegroundColor Green; ^
Write-Host '═══════════════════════════════════════════════════════════════' -ForegroundColor Cyan; ^
Write-Host ''"

exit /b 0
