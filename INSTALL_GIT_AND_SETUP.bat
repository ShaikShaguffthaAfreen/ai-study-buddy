@echo off
REM ════════════════════════════════════════════════════════════════════
REM AUTOMATIC GIT + GITHUB SETUP FOR AI STUDY BUDDY
REM Run this file as Administrator
REM ════════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  AI STUDY BUDDY - AUTOMATIC GITHUB SETUP                      ║
echo ║  This script will download and install Git automatically       ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if running as admin
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ ERROR: This script must be run as Administrator
    echo.
    echo RIGHT-CLICK this file and select "Run as administrator"
    pause
    exit /b 1
)

echo ✅ Running as Administrator
echo.

REM Download Git
echo Downloading Git for Windows...
echo This may take 1-2 minutes...
echo.

powershell -Command "^ ^
    $ProgressPreference = 'SilentlyContinue'; ^
    $url = 'https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe'; ^
    $output = 'C:\Temp\GitInstaller.exe'; ^
    $null = New-Item -ItemType Directory -Path C:\Temp -Force; ^
    Write-Host 'Downloading Git...'; ^
    Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing; ^
    Write-Host 'Download complete!'; ^
    Write-Host 'Installing Git...'; ^
    Start-Process $output -ArgumentList '/VERYSILENT /NORESTART' -Wait; ^
    Write-Host 'Git installation complete!'; ^
    Remove-Item $output -Force -ErrorAction SilentlyContinue; ^
    Write-Host 'Installation files cleaned up.'; ^
"

echo.
echo ✅ Git has been installed!
echo.
echo Restarting PowerShell to apply changes...
echo.
pause

REM Close and restart terminal
taskkill /F /IM powershell.exe >nul 2>&1
taskkill /F /IM pwsh.exe >nul 2>&1

REM Open new PowerShell and run setup
powershell -NoExit -Command "cd 'c:\Users\Afreen\Project1'; Write-Host 'Git installed! Now initializing repository...'; git --version; git init; git config --global user.name 'AI Study Buddy Developer'; git config --global user.email 'developer@ai-study-buddy.com'; git add .; git commit -m 'chore: AI Study Buddy - Initial project setup'; Write-Host ''; Write-Host 'NEXT STEP: Go to https://github.com/new and create repository'; Write-Host 'Repository name: ai-study-buddy'; Write-Host 'Visibility: PUBLIC'; Write-Host ''; Write-Host 'Then run:'; Write-Host 'git remote add origin https://github.com/YOUR_USERNAME/ai-study-buddy.git'; Write-Host 'git branch -M main'; Write-Host 'git push -u origin main';"

exit /b 0
