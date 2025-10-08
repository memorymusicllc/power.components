# GitHub Secrets Setup Guide

To enable automatic deployment to Cloudflare Pages, you need to configure the following secrets in your GitHub repository.

## Required Secrets

### 1. CLOUDFLARE_API_TOKEN

**How to get it:**

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click on your profile icon (top right) → **My Profile**
3. Go to **API Tokens** tab
4. Click **Create Token**
5. Use the **"Edit Cloudflare Workers"** template or create custom token with:
   - Permissions:
     - Account → Cloudflare Pages → Edit
   - Account Resources:
     - Include → Your Account
6. Click **Continue to summary** → **Create Token**
7. Copy the token (you won't see it again!)

### 2. CLOUDFLARE_ACCOUNT_ID

**How to get it:**

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account
3. Scroll down on the right sidebar
4. Copy the **Account ID** (format: 32 character hex string)

## Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: [paste your token]
   - Click **Add secret**
   
   Repeat for:
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: [paste your account ID]
   - Click **Add secret**

## Verify Setup

After adding secrets:

1. Make a commit and push to `main` branch
2. Go to **Actions** tab in your repository
3. You should see the workflow running
4. Check the logs to ensure deployment succeeds

## Troubleshooting

### "Invalid API token" error
- Verify the token has correct permissions
- Ensure the token hasn't expired
- Check that you copied the entire token

### "Account not found" error
- Verify the Account ID is correct
- Ensure the API token has access to this account

### Workflow not running
- Check that secrets are named exactly as shown (case-sensitive)
- Verify the workflow file is in `.github/workflows/deploy.yml`
- Ensure GitHub Actions is enabled for your repository

## Security Notes

- Never commit secrets to your repository
- Rotate API tokens regularly
- Use minimal permissions for tokens
- Monitor token usage in Cloudflare Dashboard
