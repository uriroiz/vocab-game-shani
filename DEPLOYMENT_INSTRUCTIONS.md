# 🚀 Deployment Instructions for Shani's Vocabulary Games

This guide will help you deploy Shani's combined vocabulary games to GitHub and Vercel.

## 📦 What's Included

- **Multiple Choice Game** - Easy mode with 4 options
- **Typing Challenge** - Hard mode, type the answer
- **Game Portal** - Choose which game to play
- **84 Vocabulary Words** - From Shani's custom list
- **Separate Leaderboards** - Track progress for each game

## 🔧 Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

If you have GitHub CLI installed:

```powershell
.\SETUP_NEW_GITHUB.ps1
```

### Option B: Manual Setup

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `vocab-game-shani`
3. **Do NOT** initialize with README, .gitignore, or license
4. Copy the repository URL

Then run:

```powershell
git remote remove origin
git remote add origin <YOUR-REPO-URL>
git add .
git commit -m "Initial commit - Combined vocabulary games for Shani"
git push -u origin main
```

## 🌐 Step 2: Deploy to Vercel

### Automatic Deployment (Easiest)

1. Go to [Vercel](https://vercel.com)
2. Click **"Sign in with GitHub"**
3. Click **"Add New..."** → **"Project"**
4. Find and select your `vocab-game-shani` repository
5. Vercel will automatically detect it's a Create React App
6. Click **"Deploy"**!

That's it! Your app will be live in ~2 minutes.

### Manual Configuration (if needed)

If Vercel doesn't auto-detect settings:

- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

## 📝 Post-Deployment

After deployment, you'll get a URL like:
```
https://vocab-game-shani.vercel.app
```

### Custom Domain (Optional)

You can add a custom domain in Vercel's project settings:
1. Go to project → Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## 🔄 Future Updates

Every time you push to the `main` branch on GitHub, Vercel will automatically:
1. Build your app
2. Deploy the new version
3. Make it live

To update:
```powershell
git add .
git commit -m "Your update message"
git push
```

## 🎮 Testing Before Deployment

Always test locally first:

```powershell
npm start
```

Test both game modes:
1. Click "Multiple Choice" and play a game
2. Go back home
3. Click "Typing Challenge" and play a game
4. Check that leaderboards work for both

## 📱 What Works Out of the Box

✅ Responsive design (mobile, tablet, desktop)
✅ All 84 vocabulary words loaded by default
✅ Separate leaderboards for each game
✅ Back to home button
✅ Progress tracking
✅ File upload for custom word lists

## 🐛 Troubleshooting

### Build Fails
```powershell
npm install
npm run build
```

### Can't Push to GitHub
Make sure you've removed the old remote:
```powershell
git remote remove origin
git remote add origin <YOUR-NEW-REPO-URL>
```

### Vercel Deploy Fails
Check that `vercel.json` exists and has correct settings (it should already be configured).

## 📞 Need Help?

- GitHub Issues: Report on your repo
- Vercel Support: Check deployment logs in Vercel dashboard

---

Made with ❤️ for Shani's learning journey!

