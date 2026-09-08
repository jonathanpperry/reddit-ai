import { test, expect } from "@playwright/test";

test("selecting a community uses its slug in the create-post URL", async ({
  page,
}) => {
  await page.goto("/create-post");

  await page.getByRole("combobox").click();

  await page.getByRole("option", { name: "MI .NET Community" }).click();

  await expect(page).toHaveURL(/\/create-post\?subreddit=mi-net-community$/);
});

test("community links use the subreddit slug", async ({ page }) => {
  await page.goto("/");

  const communityLink = page
    .getByRole("link", { name: "c/MI .NET Community" })
    .first();

  await expect(communityLink).toHaveAttribute(
    "href",
    "/community/mi-net-community",
  );

  await communityLink.click();

  await expect(page).toHaveURL(/\/community\/mi-net-community$/);
});
