# ═══════════════════════════════════════════════════════════════════
# AI Study Buddy - GitHub Repository Setup Script (PowerShell)
# ═══════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     AI STUDY BUDDY - GITHUB SETUP SCRIPT                      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
$gitCheck = git --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Git is not installed on your system" -ForegroundColor Red
    Write-Host ""
    Write-Host "To install Git:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor White
    Write-Host "2. Run the installer and follow the setup" -ForegroundColor White
    Write-Host "3. Use default settings" -ForegroundColor White
    Write-Host "4. Restart PowerShell" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git is installed:" -ForegroundColor Green
Write-Host $gitCheck -ForegroundColor Green
Write-Host ""

# Set git configuration
Write-Host "Setting up Git configuration..." -ForegroundColor Yellow
git config --global user.name "AI Study Buddy Developer"
git config --global user.email "ai-study-buddy@example.com"
Write-Host "✅ Git configured" -ForegroundColor Green
Write-Host ""

# Initialize repository
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init
Write-Host "✅ Repository initialized" -ForegroundColor Green
Write-Host ""

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "chore: AI Study Buddy - Initial project setup (Offline-First AI Learning Companion)"
Write-Host "✅ Initial commit created" -ForegroundColor Green
Write-Host ""

# Display next steps
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║              NEXT STEPS: CREATE GITHUB REPOSITORY             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 1: Create Repository on GitHub" -ForegroundColor Yellow
Write-Host "  1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "  2. Fill in these details:" -ForegroundColor White
Write-Host "     - Repository name: " -NoNewline; Write-Host "ai-study-buddy" -ForegroundColor Green
Write-Host "     - Description: " -NoNewline; Write-Host "Offline-first AI learning companion with optional cloud AI integration" -ForegroundColor Green
Write-Host "     - Visibility: " -NoNewline; Write-Host "PUBLIC" -ForegroundColor Green -Bold
Write-Host "     - Initialize: " -NoNewline; Write-Host "Leave unchecked" -ForegroundColor Green
Write-Host "  3. Click 'Create repository'" -ForegroundColor White
Write-Host ""

Write-Host "STEP 2: Copy Your Repository URL" -ForegroundColor Yellow
Write-Host "  After creating, you'll get a URL like:" -ForegroundColor White
Write-Host "  https://github.com/YOUR_USERNAME/ai-study-buddy.git" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 3: Run These Commands in PowerShell" -ForegroundColor Yellow
Write-Host "  " -NoNewline; Write-Host "git remote add origin https://github.com/YOUR_USERNAME/ai-study-buddy.git" -ForegroundColor Cyan
Write-Host "  " -NoNewline; Write-Host "git branch -M main" -ForegroundColor Cyan
Write-Host "  " -NoNewline; Write-Host "git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "  (Replace YOUR_USERNAME with your actual GitHub username)" -ForegroundColor Gray
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Local git repository is ready!" -ForegroundColor Green
Write-Host "✅ Your project is prepared for GitHub" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
