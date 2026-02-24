import { Page } from "@playwright/test";

export async function setMonacoValue(page: Page, value: string) {
  await page.waitForFunction(() => {
    return (
      typeof window !== "undefined" &&
      (window as any).monaco &&
      (window as any).monaco.editor.getEditors().length > 0
    );
  });

  await page.evaluate((val) => {
    const editor = (window as any).monaco.editor.getEditors()[0];
    editor.setValue(val);
  }, value);
}
