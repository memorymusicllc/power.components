# Environment Variables Setup

## Local Development

Create a `.env` file in the project root with the following variables:

```env
# Application Environment
VITE_ENVIRONMENT=development
VITE_VERSION_PREFIX=DEV

# API Configuration
VITE_API_BASE_URL=http://localhost:8787/api

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true

# Playwright Testing
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3000
```

## Cloudflare Pages Environment Variables

Configure these in the Cloudflare Dashboard under **Settings** → **Environment variables**:

### Production Environment
```
ENVIRONMENT=production
VERSION_PREFIX=PROD
```

### Preview Environment
```
ENVIRONMENT=preview
VERSION_PREFIX=DEV
```

## Cloudflare Automatic Variables

These are automatically set by Cloudflare Pages (read-only):

- `CF_PAGES` - Set to `1` when running on Cloudflare Pages
- `CF_PAGES_COMMIT_SHA` - Git commit SHA of the deployment
- `CF_PAGES_BRANCH` - Git branch name
- `CF_PAGES_URL` - Full URL of the deployment

## Version Format

The app uses this version format: `v.{DEV/PROD}.{YYYMMDD.HH.MM}.{CloudFlare_Deployment_ID}`

Example: `v.PROD.20251008.14.30.a1b2c3d4`

See `src/lib/version.ts` for implementation.
