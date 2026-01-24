@echo off
REM =================================================================
REM AI Study Buddy - GitHub Repository Setup Script
REM Run this script to initialize git and prepare for GitHub
REM =================================================================

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     AI STUDY BUDDY - GITHUB SETUP SCRIPT                      ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Git is not installed on your system
    echo.
    echo To install Git:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Run the installer
    echo 3. Use default settings
    echo 4. Restart this terminal
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)

echo ✅ Git is installed: 
git --version
echo.

REM Set git configuration
echo Setting up Git configuration...
git config --global user.name "AI Study Buddy Developer"
git config --global user.email "ai-study-buddy@example.com"
echo ✅ Git configured
echo.

REM Initialize repository
echo Initializing Git repository...
git init
echo ✅ Repository initialized
echo.

REM Add all files
echo Adding files to git...
git add .
echo ✅ Files added
echo.

REM Create initial commit
echo Creating initial commit...
git commit -m "chore: AI Study Buddy - Initial project setup (Offline-First AI Learning Companion)"
echo ✅ Initial commit created
echo.

REM Display next steps
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║              NEXT STEPS: CREATE GITHUB REPOSITORY             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 1. Go to: https://github.com/new
echo 2. Fill in these details:
echo    - Repository name: ai-study-buddy
echo    - Description: Offline-first AI learning companion with optional cloud AI integration
echo    - Select: PUBLIC
echo    - Do NOT initialize with README
echo 3. Click "Create repository"
echo.
echo 4. Copy the repository URL (https://github.com/YOUR_USERNAME/ai-study-buddy.git)
echo.
echo 5. Run this command in PowerShell:
echo    git remote add origin https://github.com/YOUR_USERNAME/ai-study-buddy.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo ═══════════════════════════════════════════════════════════════════
echo ✅ Local git repository is ready!
echo.
pause
