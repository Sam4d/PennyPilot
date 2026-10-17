import { describe, it, expect } from "vitest";
import curriculum from "../src/content/curriculum.json";
import {
  catalogueWorld,
  findCatalogueTarget,
  skillOutline,
} from "../src/lib/catalogue";
import { insuranceGuides } from "../src/content/insurance-guides";
import { compound, sip } from "../src/lib/learning";
describe("investment contribution modes", () => {
  it("grows one lump sum without repeating the contribution", () => {
    expect(compound(100000, 10, 10)).toBeCloseTo(259374.24601, 4);
    expect(compound(100000, 0, 10)).toBe(100000);
    expect(sip(5000, 0, 10)).toBe(600000);
  });
  it("shows a loss under a negative illustrative annual return", () =>
    expect(compound(100000, -20, 1)).toBe(80000));
});
describe("unrestricted catalogue access", () => {
  it("resolves every one of the 946 named skills and provides its outline", () => {
    let count = 0;
    for (const world of curriculum)
      for (const unit of world.units)
        for (const skill of unit.skills) {
          const result = findCatalogueTarget(skill.id);
          expect(result?.world.id).toBe(world.id);
          expect(result?.unit.id).toBe(unit.id);
          expect(result?.skill?.id).toBe(skill.id);
          expect(skillOutline(unit, skill).trim().length).toBeGreaterThan(0);
          count++;
        }
    expect(count).toBe(946);
  });
  it("opens units with no named skills and handles unknown topics", () => {
    expect(findCatalogueTarget("unit/12.7")?.skill).toBeNull();
    expect(findCatalogueTarget("unit/12.7")?.unit.title).toBe("Capstone");
    for (const world of curriculum)
      for (const unit of world.units)
        expect(findCatalogueTarget(`unit/${unit.id}`)?.unit.id).toBe(unit.id);
    expect(findCatalogueTarget("S99.99.99")).toBeNull();
    expect(catalogueWorld("S12.2.5")).toBe(12);
    expect(catalogueWorld("world/15")).toBe(15);
  });
  it("keeps adjacent topic details separate", () => {
    const topic = findCatalogueTarget("S5.1.3")!;
    const text = skillOutline(topic.unit, topic.skill!);
    expect(text).toContain("Unit Economics");
    expect(text).not.toContain("Cyclical vs Defensive");
  });
});
describe("insurance reading curriculum", () => {
  it("maps all 39 insurance topics to a detailed authored reading guide", () => {
    const skills = curriculum[12].units.flatMap((u) => u.skills);
    expect(skills).toHaveLength(39);
    for (const skill of skills)
      expect(insuranceGuides.some((g) => g.skills.includes(skill.id))).toBe(
        true,
      );
  });
  it("includes all levels and maintains distinct guide identifiers", () => {
    expect(insuranceGuides).toHaveLength(8);
    expect(new Set(insuranceGuides.map((g) => g.id)).size).toBe(8);
    expect(new Set(insuranceGuides.map((g) => g.level))).toEqual(
      new Set(["Beginner", "Intermediate", "Advanced"]),
    );
    for (const g of insuranceGuides) {
      expect(g.sections).toHaveLength(3);
      expect(g.checklist.length).toBeGreaterThanOrEqual(3);
      expect(g.reviewStatus).toBe("editorial-draft");
    }
  });
});
