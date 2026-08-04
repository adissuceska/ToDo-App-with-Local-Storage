import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath:
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
});

const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
});

await page.goto("http://localhost:5173");
await page.waitForSelector("#app h1");
await page.waitForTimeout(500);

await page.screenshot({
  path: "screenshots/main-view.png",
  fullPage: true,
});

const input = page.locator(".task-form__input");
await input.fill("Add screenshot automation");
await page.selectOption(".task-form__select", "High");
await page.click(".task-form__add");
await page.waitForTimeout(500);

await page.screenshot({
  path: "screenshots/with-new-task.png",
  fullPage: true,
});

await page.click(".btn--complete:not([disabled])");
await page.waitForTimeout(500);

await page.screenshot({
  path: "screenshots/complete-task.png",
  fullPage: true,
});

await page.selectOption(".filters label:first-child select", "Completed");
await page.waitForTimeout(500);

await page.screenshot({
  path: "screenshots/filter-completed.png",
  fullPage: true,
});

const mobilePage = await browser.newPage({
  viewport: { width: 375, height: 667 },
});
await mobilePage.goto("http://localhost:5173");
await mobilePage.waitForSelector("#app h1");
await mobilePage.waitForTimeout(500);

await mobilePage.screenshot({
  path: "screenshots/mobile-view.png",
  fullPage: true,
});

await browser.close();
console.log("Screenshots created successfully!");
