# AC Selling Dashboard

A modern, automated dashboard for managing marketplace listings built with Vite, React, and Cloudflare Pages.

## Features

- 🚀 Lightning-fast Vite development
- ⚡ Cloudflare Pages deployment
- 🎨 ShadCN UI with dark mode
- 📊 Real-time analytics dashboard
- 🤖 Automated response management
- 📱 Mobile-first responsive design
- 🔒 Secure authentication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Cloudflare Pages Deployment

### Automatic Deployment with GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ac-selling-dashboard.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Choose your GitHub repository
   - Configure build settings:
     - **Production branch**: `main`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/`
   - Click **Save and Deploy**

3. **Environment Variables** (Optional)
   - In Cloudflare Pages dashboard, go to **Settings** → **Environment variables**
   - Add any required variables

### Manual Deployment with Wrangler

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy
npm run build
npm run pages:deploy
```

## Project Structure

```
ac_selling_dashboard/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and helpers
│   ├── hooks/          # Custom React hooks
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── functions/          # Cloudflare Pages Functions (API routes)
├── public/             # Static assets
├── dist/               # Build output
├── vite.config.ts      # Vite configuration
├── wrangler.toml       # Cloudflare configuration
└── package.json
```

## Development

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run pages:build` - Build for Cloudflare Pages
- `npm run pages:deploy` - Deploy to Cloudflare Pages
- `npm run pages:dev` - Test Cloudflare Pages locally

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: ShadCN UI, Tailwind CSS, Radix UI
- **Routing**: React Router v6
- **State Management**: Zustand, TanStack Query
- **Charts**: Recharts, Chart.js
- **Deployment**: Cloudflare Pages
- **API**: Cloudflare Pages Functions

## Features

### Dashboard
- Real-time metrics and analytics
- Interactive charts and graphs
- Mobile-responsive cards

### Listings Management
- Create and manage marketplace listings
- Multi-platform support
- Automated posting

### Lead Management
- Track and qualify leads
- Automated responses
- Priority scoring

### Auto-Responder
- Template-based responses
- Smart triggers
- Response monitoring

### Cross-Platform Posting
- Facebook Marketplace
- OfferUp
- Craigslist

### Analytics
- Performance tracking
- Conversion metrics
- View and inquiry tracking

## License

Private - All rights reserved

## Support

For issues and questions, please open an issue in the GitHub repository.

