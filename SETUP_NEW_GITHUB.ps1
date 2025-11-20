# Setup Script for New GitHub Repository
# This script helps you create a new GitHub repo for Shani's Vocabulary Games

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Shani's Vocabulary Games - GitHub Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if gh CLI is installed
Write-Host "Checking for GitHub CLI (gh)..." -ForegroundColor Yellow
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if ($ghInstalled) {
    Write-Host "✓ GitHub CLI found!" -ForegroundColor Green
    Write-Host ""
    
    # Ask for repo name
    $repoName = Read-Host "Enter the new repository name (default: vocab-game-shani)"
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "vocab-game-shani"
    }
    
    Write-Host ""
    Write-Host "Creating GitHub repository: $repoName" -ForegroundColor Yellow
    
    # Create the repository
    gh repo create $repoName --public --source=. --remote=origin --push
    
    Write-Host ""
    Write-Host "✓ Repository created and code pushed!" -ForegroundColor Green
    
} else {
    Write-Host "✗ GitHub CLI not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please follow these manual steps:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to https://github.com/new" -ForegroundColor White
    Write-Host "2. Create a new repository named: vocab-game-shani (or your preferred name)" -ForegroundColor White
    Write-Host "3. Do NOT initialize with README, .gitignore, or license" -ForegroundColor White
    Write-Host "4. Copy the repository URL" -ForegroundColor White
    Write-Host ""
    Write-Host "5. Then run these commands:" -ForegroundColor White
    Write-Host "   git remote remove origin" -ForegroundColor Cyan
    Write-Host "   git remote add origin <YOUR-REPO-URL>" -ForegroundColor Cyan
    Write-Host "   git add ." -ForegroundColor Cyan
    Write-Host "   git commit -m ""Initial commit - Combined vocabulary games for Shani""" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Step: Deploy to Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to https://vercel.com" -ForegroundColor White
Write-Host "2. Sign in with GitHub" -ForegroundColor White
Write-Host "3. Click 'Add New...' -> 'Project'" -ForegroundColor White
Write-Host "4. Import your new repository" -ForegroundColor White
Write-Host "5. Vercel will auto-detect Create React App settings" -ForegroundColor White
Write-Host "6. Click 'Deploy'!" -ForegroundColor White
Write-Host ""
Write-Host "Your app will be live at: https://vocab-game-shani.vercel.app" -ForegroundColor Green
Write-Host "(or similar URL)" -ForegroundColor Gray
Write-Host ""

