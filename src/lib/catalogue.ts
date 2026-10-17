import curriculum from "../content/curriculum.json";
export type CatalogueSkill =
  (typeof curriculum)[number]["units"][number]["skills"][number];
export type CatalogueUnit = (typeof curriculum)[number]["units"][number];
export function skillOutline(unit: CatalogueUnit, skill: CatalogueSkill) {
  const start = unit.outline.search(
    new RegExp(skill.id.replaceAll(".", "\\.") + "\\b"),
  );
  if (start < 0) return unit.outline;
  const rest = unit.outline.slice(start + skill.id.length);
  const next = rest.search(/S\d+\.\d+\.\d+\b/);
  return rest
    .slice(0, next < 0 ? undefined : next)
    .replace(/^[\s•]+|[\s•]+$/g, "")
    .replace(/[🌱🌿🌳🏔️]/gu, "")
    .trim();
}
export function findCatalogueTarget(target: string) {
  const clean = target.replace(/^\/+|\/+$/g, "");
  for (const world of curriculum)
    for (const unit of world.units) {
      if (clean === `unit/${unit.id}`) return { world, unit, skill: null };
      const skill = unit.skills.find((s) => s.id === clean);
      if (skill) return { world, unit, skill };
    }
  return null;
}
export function catalogueWorld(target: string) {
  if (target.startsWith("world/")) {
    const index = Number(target.slice(6));
    if (Number.isInteger(index) && index >= 0 && index < curriculum.length)
      return index;
  }
  return findCatalogueTarget(target)?.world.id ?? 0;
}
