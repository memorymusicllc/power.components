/**
 * Playwright Test Fixtures
 * Base configuration and helpers for all tests
 */

import { test as base, expect } from '@playwright/test';

type TestFixtures = {
  dashboardPage: DashboardPage;
  libraryPage: LibraryPage;
};

class DashboardPage {
  constructor(public readonly page: any) {}

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  async verifyStyles() {
    // Check if background color is applied (dark mode)
    const bgColor = await this.page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    return bgColor && bgColor !== 'rgba(0, 0, 0, 0)';
  }
}

class LibraryPage {
  constructor(public readonly page: any) {}

  async goto() {
    await this.page.goto('/library');
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }
}

export const test = base.extend<TestFixtures>({
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  libraryPage: async ({ page }, use) => {
    const libraryPage = new LibraryPage(page);
    await use(libraryPage);
  },
});

export { expect };

