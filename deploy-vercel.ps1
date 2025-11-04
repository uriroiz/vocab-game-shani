# Deploy to Vercel using npx (no installation needed)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deploying to Vercel..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Deploy using npx vercel (non-interactive)
npx vercel --yes --prod --token=$env:VERCEL_TOKEN

