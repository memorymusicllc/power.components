# Cloudflare Pages Auto-Deploy Setup

## Overview

This guide will help you enable **automatic deployment** from GitHub to Cloudflare Pages. Once configured, every push to the `main` branch will automatically trigger a deployment.

## Two Deployment Methods

You can choose either method (or use both):

### Method 1: Cloudflare Pages Direct Integration (Recommended)
- Cloudflare watches your GitHub repo directly
- No GitHub secrets needed for basic deployment
- Automatic deployments on every push
- Preview deployments for pull requests

### Method 2: GitHub Actions with Cloudflare API
- More control over the deployment process
- Can add custom build steps or tests before deployment
- Requires GitHub secrets configuration

---

## Method 1: Cloudflare Pages Direct Integration

This is the **simplest and recommended approach**.

### Step 1: Connect GitHub Repository to Cloudflare Pages

1. **Log in to Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com/
   - Select your account

2. **Navigate to Pages**
   - Click **Workers & Pages** in the left sidebar
   - Click **Create application**
   - Click **Pages** tab
   - Click **Connect to Git**

3. **Authorize GitHub**
   - Click **Connect GitHub**
   - Authorize Cloudflare Pages to access your GitHub account
   - Select **make-sum** organization (or your personal account)
   - Grant access to the **pow3r-cashout** repository

4. **Configure Build Settings**
   
   **Project name**: `pow3r-cashout`
   
   **Production branch**: `main`
   
   **Build settings**:
   - **Framework preset**: None (or Vite)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)
   
   **Environment variables** (optional):
   - `NODE_VERSION`: `18`

5. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will immediately build and deploy your site

### Step 2: Verify Auto-Deploy is Working

1. Make a small change to your repository
2. Push to the `main` branch
3. Go to Cloudflare Pages dashboard
4. You should see a new deployment automatically triggered

### Step 3: Configure Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to your project
2. Click **Custom domains** tab
3. Add your custom domain
4. Cloudflare will automatically configure DNS

---

## Method 2: GitHub Actions Deployment

If you prefer more control, use GitHub Actions (already configured).

### Step 1: Get Cloudflare API Token

1. **Log in to Cloudflare Dashboard**
   - Go to: https://dash.cloudflare.com/

2. **Create API Token**
   - Click your profile icon (top right) → **My Profile**
   - Go to **API Tokens** tab
   - Click **Create Token**
   - Use **"Edit Cloudflare Workers"** template
   - Or create custom with these permissions:
     - **Account** → **Cloudflare Pages** → **Edit**
   - Click **Continue to summary** → **Create Token**
   - **COPY THE TOKEN** (you won't see it again!)

3. **Get Account ID**
   - Go to Cloudflare Dashboard
   - Select your account
   - Scroll down in the right sidebar
   - Copy the **Account ID** (32-character hex string)

### Step 2: Add GitHub Secrets

1. **Go to GitHub Repository Settings**
   - Navigate to: https://github.com/make-sum/pow3r-cashout/settings/secrets/actions

2. **Add CLOUDFLARE_API_TOKEN**
   - Click **New repository secret**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: [paste your token]
   - Click **Add secret**

3. **Add CLOUDFLARE_ACCOUNT_ID**
   - Click **New repository secret**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: [paste your account ID]
   - Click **Add secret**

### Step 3: Verify GitHub Actions

1. Push a change to `main` branch
2. Go to: https://github.com/make-sum/pow3r-cashout/actions
3. Watch the deployment workflow run
4. After deployment, E2E tests will run automatically

---

## Which Method Should You Use?

### Use Method 1 (Direct Integration) If:
- ✅ You want the simplest setup
- ✅ You don't need custom CI/CD steps
- ✅ You want Cloudflare to handle everything
- ✅ You want preview deployments for PRs automatically

### Use Method 2 (GitHub Actions) If:
- ✅ You need custom build steps
- ✅ You want to run tests before deployment
- ✅ You need more control over the process
- ✅ You want to integrate with other GitHub Actions

### Use Both If:
- ✅ You want Cloudflare's automatic deployments
- ✅ AND you want to run E2E tests via GitHub Actions
- Note: This will trigger two deployments per push (one from each method)

---

## Current Configuration Status

### ✅ Already Configured
- [x] GitHub repository created and pushed
- [x] `wrangler.toml` configured
- [x] Build scripts in `package.json`
- [x] GitHub Actions workflow created
- [x] Playwright E2E tests configured
- [x] Test suite updated (visual validation)

### ⚠️ Needs Configuration
- [ ] Choose deployment method (1 or 2)
- [ ] Connect GitHub repo to Cloudflare (Method 1)
  OR
- [ ] Add GitHub secrets (Method 2)

---

## Deployment URLs

After setup, your site will be available at:

**Production**: `https://pow3r-cashout.pages.dev`

**Custom domain** (if configured): Your custom domain

**Preview deployments**: `https://[commit-hash].pow3r-cashout.pages.dev`

---

## Environment Variables

Configure these in Cloudflare Pages dashboard:

### Production Environment
- `ENVIRONMENT=production`
- `VERSION_PREFIX=PROD`
- `NODE_VERSION=18`

### Preview Environment
- `ENVIRONMENT=preview`
- `VERSION_PREFIX=DEV`
- `NODE_VERSION=18`

---

## Testing the Deployment

Once configured, test with:

```bash
# Make a small change
echo "# Test deployment" >> README.md

# Commit and push
git add README.md
git commit -m "Test automatic deployment"
git push origin main

# Watch deployment
# Method 1: https://dash.cloudflare.com/ → Workers & Pages → pow3r-cashout
# Method 2: https://github.com/make-sum/pow3r-cashout/actions
```

---

## Troubleshooting

### Deployment Fails

**Check build logs**:
- Cloudflare: Dashboard → Project → Deployments → View build log
- GitHub: Repository → Actions → View workflow run

**Common issues**:
- Missing dependencies: Run `npm ci` locally to verify
- Build errors: Run `npm run build` locally to test
- Wrong Node version: Set `NODE_VERSION=18` environment variable

### E2E Tests Fail

- Check test screenshots in GitHub Actions artifacts
- View Playwright HTML report
- Run tests locally: `BASE_URL=your-deployment-url npm run test`

### No Automatic Deployment

**Method 1**:
- Verify GitHub integration is active in Cloudflare dashboard
- Check that the repository has push permissions

**Method 2**:
- Verify GitHub secrets are set correctly
- Check GitHub Actions workflow is enabled
- Look for errors in Actions tab

---

## Next Steps

1. **Choose your deployment method** (Method 1 recommended)
2. **Follow the setup steps** for your chosen method
3. **Test deployment** by pushing a change
4. **Configure custom domain** (optional)
5. **Set up monitoring** (Cloudflare Analytics)

---

## Support

- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Playwright Docs**: https://playwright.dev/

---

**Recommendation**: Use **Method 1** for simplicity. Cloudflare will handle everything automatically once you connect your GitHub repository.
