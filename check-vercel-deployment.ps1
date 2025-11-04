# Script to check Vercel deployment status
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Checking Vercel GitHub App Status" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel App is installed
Write-Host "Checking Vercel GitHub App installation..." -ForegroundColor Yellow
$installations = gh api user/installations --jq '.[] | select(.app_slug == "vercel") | {id: .id, account: .account.login}' 2>$null

if ($installations) {
    Write-Host "✅ Vercel GitHub App is installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Checking if repository is connected to Vercel..." -ForegroundColor Yellow
    
    # Check Vercel dashboard via API (if we have token)
    $vercelToken = $env:VERCEL_TOKEN
    if ($vercelToken) {
        Write-Host "Found Vercel token, checking deployments..." -ForegroundColor Green
        # Try to check via Vercel API
    } else {
        Write-Host ""
        Write-Host "To check deployment status:" -ForegroundColor Cyan
        Write-Host "1. Go to: https://vercel.com/dashboard" -ForegroundColor White
        Write-Host "2. Look for 'vocab-game-maayan' project" -ForegroundColor White
        Write-Host ""
        Write-Host "Or check GitHub repository:" -ForegroundColor Cyan
        Write-Host "https://github.com/uriroiz/vocab-game-maayan" -ForegroundColor White
        Write-Host ""
        Write-Host "If you see a 'Deploy to Vercel' button, click it!" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Vercel GitHub App is NOT installed yet" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Install Vercel GitHub App from the browser window that opened" -ForegroundColor White
    Write-Host "2. Select repository: vocab-game-maayan" -ForegroundColor White
    Write-Host "3. Click Install" -ForegroundColor White
    Write-Host ""
    Write-Host "Or install manually:" -ForegroundColor Cyan
    Write-Host "https://github.com/apps/vercel/installations/new" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

