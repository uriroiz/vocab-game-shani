# Deploy to Vercel Script
# This script helps you deploy Shani's Vocabulary Games to Vercel

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deploy to Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if ($vercelInstalled) {
    Write-Host "✓ Vercel CLI found!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
    Write-Host ""
    
    # Deploy to Vercel
    vercel --prod
    
    Write-Host ""
    Write-Host "✓ Deployment complete!" -ForegroundColor Green
    
} else {
    Write-Host "✗ Vercel CLI not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Choose deployment method:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install Vercel CLI (Recommended for quick deploy)" -ForegroundColor Cyan
    Write-Host "  npm install -g vercel" -ForegroundColor White
    Write-Host "  vercel login" -ForegroundColor White
    Write-Host "  vercel --prod" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Deploy via Vercel Dashboard (Easiest)" -ForegroundColor Cyan
    Write-Host "  1. Go to https://vercel.com/new" -ForegroundColor White
    Write-Host "  2. Sign in with GitHub" -ForegroundColor White
    Write-Host "  3. Click 'Import Project'" -ForegroundColor White
    Write-Host "  4. Select: uriroiz/vocab-game-shani" -ForegroundColor White
    Write-Host "  5. Click 'Deploy' (settings are auto-detected)" -ForegroundColor White
    Write-Host ""
    Write-Host "Your GitHub repo: https://github.com/uriroiz/vocab-game-shani" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "After deployment, you'll get a URL like:" -ForegroundColor Cyan
Write-Host "https://vocab-game-shani.vercel.app" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

