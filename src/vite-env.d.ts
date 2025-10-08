/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Vite environment variables
  readonly VITE_ENVIRONMENT?: string
  readonly VITE_VERSION_PREFIX?: string
  readonly VITE_API_BASE_URL?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_DEBUG?: string
  
  // Cloudflare Pages environment variables
  readonly CF_PAGES?: string
  readonly CF_PAGES_COMMIT_SHA?: string
  readonly CF_PAGES_BRANCH?: string
  readonly CF_PAGES_URL?: string
  
  // Playwright testing
  readonly PLAYWRIGHT_TEST_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
