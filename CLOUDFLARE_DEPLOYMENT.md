# Cloudflare Pages Deployment Guide

**Project**: pow3r.cashout  
**Tech Stack**: React Three Fiber/Redux UI/Zustand/Vite/Tailwind CSS/Playwright/CloudFlare  
**Version Format**: `v.{DEV/PROD}.{YYYMMDD.HH.MM}.{CloudFlare_Deployment_ID}`

---

## Required Configuration

### Cloudflare Tokens & Access
- **Location**: Cursor Secrets (IDE integrated)
- **GitHub App**: Configured with auto-merge permissions
- **Required Tokens**:
  - Cloudflare Pages deployment token
  - Cloudflare Workers API token
  - GitHub CLI access token

### Environment Variables

**Production:**
```env
ENVIRONMENT=production
VERSION_PREFIX=PROD
```

**Preview/Development:**
```env
ENVIRONMENT=preview
VERSION_PREFIX=DEV
```

---

## Deployment Methods

### Method 1: Auto Deploy with GitHub (Recommended)

#### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit - pow3r.cashout"
```

#### 2. Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pow3r.cashout.git
git push -u origin main
```

#### 3. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your GitHub repository
4. Configure build settings:
   - **Project name**: `pow3r-cashout`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
   - **Production branch**: `main`
   - **Node version**: `20` (required)

#### 4. Configure Environment Variables

In Cloudflare Pages dashboard → **Settings** → **Environment variables**:

**Production Environment:**
- `ENVIRONMENT` = `production`
- `VERSION_PREFIX` = `PROD`

**Preview Environment:**
- `ENVIRONMENT` = `preview`
- `VERSION_PREFIX` = `DEV`

#### 5. Deploy

- Click **Save and Deploy**
- Cloudflare will automatically build and deploy
- Every push to `main` triggers production deployment
- Pull requests trigger preview deployments

---

### Method 2: Manual Deployment with Wrangler CLI

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=pow3r-cashout
```

---

## Build Configuration

```toml
# wrangler.toml
name = "pow3r-cashout"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"

[env.production]
vars = { 
  ENVIRONMENT = "production",
  VERSION_PREFIX = "PROD"
}

[env.preview]
vars = { 
  ENVIRONMENT = "preview",
  VERSION_PREFIX = "DEV"
}
```

---

## Testing Requirements

### MANDATORY: Pre-Deployment Testing

1. **Playwright E2E Tests** (REQUIRED before deployment)
   ```bash
   npm run test:e2e
   ```

2. **Build Verification**
   ```bash
   npm run build
   npm run preview
   ```

3. **Local Cloudflare Pages Testing**
   ```bash
   npx wrangler pages dev dist
   ```

### Testing Checklist
- [ ] All Playwright E2E tests pass
- [ ] Build completes without errors
- [ ] Preview server shows expected functionality
- [ ] API routes (`/functions`) work correctly
- [ ] Version format displays correctly
- [ ] No mock data or simulations present

---

## Version Display Implementation

Implement version display in your app:

```typescript
// Get from Cloudflare environment
const environment = import.meta.env.VITE_ENVIRONMENT || 'DEV';
const versionPrefix = environment === 'production' ? 'PROD' : 'DEV';
const timestamp = new Date().toISOString().replace(/[-:T]/g, '.').split('.').slice(0, 5).join('.');
const deploymentId = import.meta.env.CF_PAGES_COMMIT_SHA?.substring(0, 8) || 'local';

const version = `v.${versionPrefix}.${timestamp}.${deploymentId}`;
```

---

## Custom Domain Setup

1. In Cloudflare Pages dashboard → **Custom domains**
2. Add your domain: `pow3r.cashout` (or your actual domain)
3. Cloudflare automatically provisions SSL certificate
4. DNS records are configured automatically

---

## CI/CD Integration

### GitHub Actions (Auto-configured)

Cloudflare Pages automatically:
- Builds on every push to `main`
- Creates preview deployments for PRs
- Runs build checks before merge
- Auto-merges PRs when tests pass (if configured)

### Required GitHub Settings

- Branch protection on `main`
- Require status checks before merge
- Auto-merge enabled for approved PRs
- Squash merge preferred

---

## Project Structure

```
pow3r.cashout/
├── functions/           # Cloudflare Pages Functions (API routes)
│   └── api/
│       ├── _middleware.ts
│       └── auth/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities
│   ├── App.tsx
│   └── main.tsx
├── public/              # Static assets
├── dist/                # Build output (ignored in git)
├── vite.config.ts       # Vite configuration
├── wrangler.toml        # Cloudflare configuration
└── playwright.config.ts # E2E test configuration
```

---

## Troubleshooting

### Build Failures

1. **Check Node version**: Must be 18 or 20
   ```bash
   node --version
   ```

2. **Verify dependencies**:
   ```bash
   npm ci
   npm run build
   ```

3. **Review Cloudflare build logs**:
   - Go to Cloudflare dashboard
   - Select your project
   - Check **Deployments** tab for detailed logs

### Common Issues

**Issue**: Build succeeds but app doesn't load
- **Solution**: Check `_redirects` file in `public/` directory
- **Verify**: SPA routing is configured correctly

**Issue**: API routes (Functions) not working
- **Solution**: Ensure `functions/` directory structure matches Cloudflare requirements
- **Check**: Middleware is properly configured

**Issue**: Environment variables not available
- **Solution**: Add to Cloudflare dashboard, not `.env` files
- **Note**: `.env` files are not deployed to Cloudflare Pages

---

## Security & Access

### Bot Protection
- Cloudflare Bot Management enabled
- Turnstile CAPTCHA for auth endpoints
- Rate limiting on API routes

### Authentication
- Implemented in `/functions/api/auth/`
- Uses Cloudflare KV for session storage
- JWT tokens for API authentication

---

## Monitoring & Analytics

### Cloudflare Web Analytics
- Automatically enabled for Pages
- Privacy-focused (no cookies)
- Real-time visitor stats

### Performance Monitoring
- Core Web Vitals tracked
- Edge response times
- Cache hit rates

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run E2E tests
npm run test:e2e

# Build for production
npm run build

# Preview production build
npm run preview

# Test with Cloudflare Pages locally
npx wrangler pages dev dist
```

**Development URL**: `http://localhost:5173` (Vite default)  
**Preview URL**: `http://localhost:4173`  
**Wrangler Dev URL**: `http://localhost:8788`

---

## Compliance Notes

- ✅ No ShadCN or Next.js (per system policies)
- ✅ Tailwind CSS Basic (approved)
- ✅ Vite build system (approved)
- ✅ Zustand for state management (approved)
- ✅ Playwright E2E testing (mandatory)
- ✅ Real data only (no mocks or simulations)

---

## Support & Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Playwright Docs](https://playwright.dev/)
- [Vite Docs](https://vitejs.dev/)
