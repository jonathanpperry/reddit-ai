import { describe, expect, it } from "vitest";
import { generateSlug } from "../../lib/generateSlug";

describe("generateSlug", () => {
  it("lowercases community names and replaces spaces with hyphens", () => {
    expect(generateSlug("MI NET Community")).toBe("mi-net-community");
  });

  it("removes punctuation and unsupported characters", () => {
    expect(generateSlug("Jim's .NET Community")).toBe("jims-net-community");
  });

  it("collapses multiple spaces into one hyphen", () => {
    expect(generateSlug("Michigan   Pool   Players")).toBe(
      "michigan-pool-players",
    );
  });

  it("preserves valid numbers and hyphens", () => {
    expect(generateSlug("9-Ball Players")).toBe("9-ball-players");
  });

  it("limits slugs to 21 characters", () => {
    const slug = generateSlug("This Community Name Is Definitely Too Long");

    expect(slug.length).toBeLessThanOrEqual(21);
  });
});
