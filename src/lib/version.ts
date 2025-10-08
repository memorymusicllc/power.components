/**
 * Version Display Utility
 * Format: v.{DEV/PROD}.{YYYMMDD.HH.MM}.{CloudFlare_Deployment_ID}
 * 
 * Example: v.PROD.20251008.14.30.a1b2c3d4
 * 
 * Per .cursor/rules/project-policies.md
 */

export function getAppVersion(): string {
  // Get environment from Vite env vars or default to DEV
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';
  const versionPrefix = environment === 'production' ? 'PROD' : 'DEV';
  
  // Generate timestamp in format YYYYMMDD.HH.MM
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('') + '.' + 
  [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0')
  ].join('.');
  
  // Get Cloudflare Pages deployment ID (first 8 chars of commit SHA)
  // Falls back to 'local' for local development
  const deploymentId = import.meta.env.CF_PAGES_COMMIT_SHA?.substring(0, 8) || 'local';
  
  return `v.${versionPrefix}.${timestamp}.${deploymentId}`;
}

export function getVersionInfo() {
  return {
    version: getAppVersion(),
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
    commitSha: import.meta.env.CF_PAGES_COMMIT_SHA || 'local',
    branch: import.meta.env.CF_PAGES_BRANCH || 'local',
    buildTime: new Date().toISOString(),
  };
}
