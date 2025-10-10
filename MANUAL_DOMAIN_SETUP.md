# Manual Domain Setup for comp.theylove.me

## Current Issue
- **Error**: 522 Connection timed out
- **Cause**: Custom domain not added to Pages project
- **API Bug**: Cloudflare API incorrectly identifies `theylove.me` as invalid TLD

## Manual Fix Required

### Step 1: Access Cloudflare Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Login with your account credentials

### Step 2: Navigate to Pages Project
1. Click **Pages** in the left sidebar
2. Find and click on **power-components** project
3. Click on **Custom domains** tab

### Step 3: Add Custom Domain
1. Click **Set up a custom domain** button
2. Enter: `comp.theylove.me`
3. Click **Continue**
4. The domain should auto-verify since DNS record already exists

### Step 4: Verify Setup
1. Wait 2-3 minutes for propagation
2. Test: `curl -I https://comp.theylove.me`
3. Should return 200 status instead of 522

## Current DNS Configuration (Already Correct)
```
comp.theylove.me    CNAME    power-components.pages.dev    Proxied: Yes
```

## Alternative: Use Cloudflare CLI
If you have the Cloudflare CLI installed:

```bash
# Install Cloudflare CLI
npm install -g @cloudflare/cli

# Login
cf login

# Add custom domain
cf pages domain add comp.theylove.me --project power-components
```

## Why This Happened
The Cloudflare API has a bug where it incorrectly identifies `theylove.me` as an invalid TLD, even though it's a valid domain managed by Cloudflare. This prevents programmatic addition of the custom domain.

## Verification Commands
After manual setup:

```bash
# Check if domain is added to Pages project
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/power-components/domains" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json"

# Test domain accessibility
curl -I https://comp.theylove.me
```

## Expected Result
After successful setup, `comp.theylove.me` should:
- Return HTTP 200 status
- Display the Power Components library
- Show all 40+ components including Power Redact Plugin v2.0
