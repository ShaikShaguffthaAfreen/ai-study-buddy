@echo off
REM ════════════════════════════════════════════════════════════════════
REM AI STUDY BUDDY - GITHUB SYNC AUTOMATION
REM This script syncs your project with GitHub repository
REM ════════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  AI STUDY BUDDY - GITHUB SYNC                                 ║
echo ║  Syncing with: ShaikShaguffthaAfreen/ai-study-buddy           ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Navigate to project
cd /d c:\Users\Afreen\Project1

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Git is not installed
    echo.
    echo Download Git from: https://git-scm.com/download/win
    echo Then run this script again
    pause
    exit /b 1
)

echo ✅ Git found
echo.

REM Initialize git
echo [1/7] Initializing git repository...
git init
echo ✅ Done
echo.

REM Configure git
echo [2/7] Configuring git user...
git config --global user.name "ShaikShaguffthaAfreen"
git config --global user.email "your-email@example.com"
echo ✅ Done
echo.

REM Add files
echo [3/7] Adding all files...
git add .
echo ✅ Done
echo.

REM Create commit
echo [4/7] Creating initial commit...
git commit -m "chore: AI Study Buddy - Initial project setup - Offline-First AI Learning Companion"
echo ✅ Done
echo.

REM Add remote
echo [5/7] Adding GitHub remote...
git remote add origin https://github.com/ShaikShaguffthaAfreen/ai-study-buddy.git
echo ✅ Done
echo.

REM Rename branch
echo [6/7] Renaming branch to main...
git branch -M main
echo ✅ Done
echo.

REM Push to GitHub
echo [7/7] Pushing code to GitHub...
echo.
echo When prompted for authentication:
echo 1. Go to: https://github.com/settings/tokens
echo 2. Generate new token (classic)
echo 3. Select: repo and workflow scopes
echo 4. Copy token and paste below
echo.
git push -u origin main

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                    SYNC COMPLETE!                             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo ✅ Your repository is now synced!
echo.
echo Verify at: https://github.com/ShaikShaguffthaAfreen/ai-study-buddy
echo.
pause
