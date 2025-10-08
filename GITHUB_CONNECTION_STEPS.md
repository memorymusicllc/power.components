# Connect GitHub to Cloudflare Pages - Quick Steps

## The page should now be open in your browser at:
**https://dash.cloudflare.com/7d84a4241cd92238463580dd0e094bc7/pages/view/pow3r-cashout/settings/builds**

---

## 📋 Steps to Connect GitHub (2 minutes)

### 1. Find the Source Section
Look for **"Source"** or **"Build configuration"** section on the page.

### 2. Click "Connect to Git" or "Change source"
- If you see **"Direct Upload"** currently selected → Click **"Connect Git"** or **"Connect to Git"**
- If you see **"No source connected"** → Click **"Connect"** or **"Connect Git"**

### 3. Connect GitHub
- Click **"Connect GitHub"** button
- A GitHub authorization popup will appear
- Click **"Authorize Cloudflare Pages"** (if not already authorized)

### 4. Select Repository
- Organization: **make-sum**
- Repository: **pow3r-cashout**
- Click **"Install & Authorize"** or **"Select repository"**

### 5. Configure Build Settings
Verify these settings are correct:

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty)

### 6. Click "Save" or "Save and Deploy"
- Cloudflare will connect to your GitHub repository
- It may trigger an initial deployment automatically

---

## ✅ Verification

After connecting, you should see:

1. **Source**: Shows "GitHub" with repository name
2. **Build settings**: Shows your configuration
3. **Automatic deployments**: Enabled for `main` branch

---

## 🧪 Test Auto-Deploy

```bash
# Make a test change
echo "# GitHub auto-deploy connected!" >> README.md

# Commit and push
git add README.md
git commit -m "Test: Verify GitHub → Cloudflare auto-deploy"
git push origin main
```

Then watch deployment at:
**https://dash.cloudflare.com/7d84a4241cd92238463580dd0e094bc7/pages/view/pow3r-cashout**

---

## 🎉 Expected Result

Within 1-2 minutes:
- New deployment appears in Cloudflare dashboard
- Build runs automatically
- Site deploys to https://pow3r-cashout.pages.dev
- GitHub commit shows Cloudflare deployment status

---

## 🆘 Troubleshooting

### Can't find "Connect to Git" button?
- Look for **"Settings"** tab → **"Builds & deployments"** section
- Or go directly to: https://dash.cloudflare.com/7d84a4241cd92238463580dd0e094bc7/pages/view/pow3r-cashout

### GitHub authorization fails?
- Check GitHub settings: https://github.com/settings/installations
- Look for "Cloudflare Pages" app
- Grant access to `make-sum/pow3r-cashout` repository

### Repository not showing?
- Make sure you have admin access to the repository
- Check that Cloudflare Pages has permission to access the organization

---

**The page is open in your browser - just follow the steps above to complete the connection!**
