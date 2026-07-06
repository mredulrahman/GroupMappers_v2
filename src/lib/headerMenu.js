import headerMenuItems from "@/assets/data/header-menu.json";

function findMenuItem(items, label) {
  for (const item of items) {
    if (item.label === label) return item;
    if (item.items) {
      const found = findMenuItem(item.items, label);
      if (found) return found;
    }
  }
  return null;
}

function getLeaves(item) {
  if (!item) return [];
  if (!item.items?.length) return item.url ? [item] : [];
  return item.items.flatMap(getLeaves);
}

function slugFromUrl(url, prefix) {
  return url.replace(prefix, "").replace(/^\/+|\/+$/g, "");
}

function mapProjectItem(item) {
  const isRabies = item.url.startsWith("/service/rabies/");
  return {
    slug: slugFromUrl(item.url, isRabies ? "/service/rabies/" : "/service/"),
    title: item.label,
    type: isRabies ? "rabiesPage" : "project",
  };
}

function mapActivityItem(item) {
  return {
    slug: slugFromUrl(item.url, "/activity/"),
    title: item.label,
    type: "activity",
  };
}

export const headerItems = headerMenuItems;

export const projectPageItems = getLeaves(findMenuItem(headerMenuItems, "Projects"))
  .filter((item) => item.url?.startsWith("/service/"))
  .map(mapProjectItem);

export const activityPageItems = getLeaves(findMenuItem(headerMenuItems, "Activities"))
  .filter((item) => item.url?.startsWith("/activity/"))
  .map(mapActivityItem);

export const projectSlugSequence = projectPageItems.map((item) => item.slug);
export const activitySlugSequence = activityPageItems.map((item) => item.slug);
