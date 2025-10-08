# Deployment Guide - pow3r.cashout

## Overview

This project uses **Cloudflare Pages** for hosting with automatic deployments triggered by GitHub pushes. E2E tests run automatically after each deployment using Playwright.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + ShadCN UI (Dark Mode)
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions
- **Testing**: Playwright (Chrome only)

## Deployment Process

### Automatic Deployment

Every push to the `main` branch triggers:

1. **Build** - Application is built using Vite
2. **Deploy** - Deployed to Cloudflare Pages
3. **Test** - E2E tests run against the deployed URL
4. **Report** - Test results uploaded as artifacts

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npm run pages:deploy
```

## GitHub Actions Workflow

The deployment workflow is defined in `.github/workflows/deploy.yml`:

- **Trigger**: Push to `main` or pull requests
- **Jobs**:
  - `deploy`: Builds and deploys to Cloudflare Pages
  - `test`: Runs Playwright E2E tests on deployment

## Required Secrets

Configure these secrets in your GitHub repository settings:

1. **CLOUDFLARE_API_TOKEN**
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create token with "Cloudflare Pages" permissions

2. **CLOUDFLARE_ACCOUNT_ID**
   - Found in Cloudflare Dashboard → Account → Account ID

## Cloudflare Pages Configuration

### Project Settings

- **Project Name**: `pow3r-cashout`
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Node Version**: 18.x

### Environment Variables

**Production**:
- `ENVIRONMENT=production`
- `VERSION_PREFIX=PROD`

**Preview**:
- `ENVIRONMENT=preview`
- `VERSION_PREFIX=DEV`

## Version Format

Deployments follow this version format:
```
v.{DEV/PROD}.{YYYYMMDD.HH.MM}.{CloudFlare_Deployment_ID}
```

## E2E Testing

### Test Suites

- **Dashboard Tests**: Core dashboard functionality
- **Navigation Tests**: Page routing and navigation
- **Performance Tests**: Load times and console errors
- **Accessibility Tests**: A11y compliance

### Running Tests Locally

```bash
# Run all tests
npm test

# Run with UI (interactive)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

### CI Test Configuration

- **Browser**: Chrome only (as per project requirements)
- **Retries**: 2 retries on CI
- **Reports**: HTML, JSON, and list formats
- **Artifacts**: Uploaded to GitHub Actions (30-day retention)

## Monitoring Deployment

### GitHub Actions

1. Go to your repository on GitHub
2. Click "Actions" tab
3. View workflow runs and test results

### Cloudflare Pages

1. Go to Cloudflare Dashboard
2. Navigate to Pages → pow3r-cashout
3. View deployment history and logs

## Rollback

To rollback to a previous deployment:

1. Go to Cloudflare Pages Dashboard
2. Select the deployment you want to rollback to
3. Click "Rollback to this deployment"

Or via git:

```bash
git revert <commit-hash>
git push origin main
```

## Troubleshooting

### Build Fails

- Check GitHub Actions logs for errors
- Verify all dependencies are installed
- Ensure TypeScript compiles without errors

### Tests Fail

- Check Playwright test reports in GitHub Actions artifacts
- Run tests locally to reproduce issues
- Verify deployment URL is accessible

### Deployment Not Triggering

- Verify GitHub Actions workflow file is in `.github/workflows/`
- Check GitHub repository settings → Actions → General
- Ensure secrets are configured correctly

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright Documentation](https://playwright.dev/)
- [Vite Documentation](https://vitejs.dev/)

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review Cloudflare Pages deployment logs
3. Check Playwright test reports
