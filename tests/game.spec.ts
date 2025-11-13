// E2E tests for game flow

import { test, expect } from '@playwright/test';

test.describe('Snake Game E2E', () => {
  test('should display main menu', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=🐍 Snake')).toBeVisible();
    await expect(page.locator('text=Start Game')).toBeVisible();
    await expect(page.locator('text=Settings')).toBeVisible();
    await expect(page.locator('text=Profile')).toBeVisible();
  });

  test('should start game', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Start Game');
    
    // Wait for game canvas to appear
    await expect(page.locator('canvas')).toBeVisible();
    await expect(page.locator('text=Score')).toBeVisible();
    await expect(page.locator('text=Length')).toBeVisible();
  });

  test('should navigate to settings', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Settings');
    
    await expect(page.locator('text=⚙️ Settings')).toBeVisible();
    await expect(page.locator('text=Speed')).toBeVisible();
    await expect(page.locator('text=Wall Mode')).toBeVisible();
  });

  test('should navigate to profile', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Profile');
    
    await expect(page.locator('text=👤 Profile')).toBeVisible();
    await expect(page.locator('text=High Score')).toBeVisible();
    await expect(page.locator('text=Achievements')).toBeVisible();
  });

  test('should pause game with space key', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Start Game');
    await expect(page.locator('canvas')).toBeVisible();
    
    await page.keyboard.press('Space');
    await expect(page.locator('text=⏸️ Paused')).toBeVisible();
  });

  test('should control snake with arrow keys', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Start Game');
    await expect(page.locator('canvas')).toBeVisible();
    
    // Press arrow keys
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowLeft');
    
    // Game should still be running
    await expect(page.locator('canvas')).toBeVisible();
  });

  test('should update score display', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Start Game');
    
    const initialScore = await page.locator('text=/Score/').textContent();
    expect(initialScore).toBeTruthy();
  });

  test('should change settings', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Settings');
    
    // Change wall mode
    await page.click('text=🔄 Wrap');
    
    // Go back
    await page.click('text=← Back');
    await expect(page.locator('text=🐍 Snake')).toBeVisible();
  });
});

