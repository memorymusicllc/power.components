#!/bin/bash

# Build and Deploy Script
# Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)

echo "🚀 Starting build and deployment process..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Install missing dependencies if needed
echo "🔧 Installing missing dependencies..."
npm install immer@^10.0.3

# Step 3: Type check
echo "🔍 Running type check..."
npm run type-check

# Step 4: Lint check
echo "🧹 Running lint check..."
npm run lint

# Step 5: Build
echo "🔨 Building project..."
npm run build

# Step 6: Test
echo "🧪 Running tests..."
npm run test:run

# Step 7: Deploy
echo "☁️ Deploying to CloudFlare..."
npm run deploy:components

echo "✅ Build and deployment completed successfully!"
