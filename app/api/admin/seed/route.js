import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../src/lib/cmsAuth";
import { connectMongo } from "../../../../src/lib/mongodb";
import ContentItem from "../../../../src/models/ContentItem";
import activityData from "../../../../src/assets/data/activity-data.json";
import newsData from "../../../../src/assets/data/news-data.json";
import profileData from "../../../../src/assets/data/profile.json";
import rabiesData from "../../../../src/assets/data/rabies-data.json";
import profilesData from "../../../../src/assets/data/profile.json";
import statItemsData from "../../../../src/assets/data/stat-data.json";
import galleryData from "../../../../src/assets/data/galleryPage-data.json";


function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeItems() {
  const profiles = profilesData.map((item) => ({
    type: "profiles",
    title: item.name,
    slug: item.profileUrl || "",
    status: "published",
    body: item.bio || "",
    images: item.image || [],
    metadata: {
      legacyKey: item.key || "",
    },
  }));

  const statItems = statItemsData.statItems.map((item) => ({
    type: "bytheNumbers",
    body: item.label,
    slug: item.id.toString(),
    title: `item-${item.id.toString()}`,
    status: "published",
    images: item.icon,
    summary: item.value,
    metadata: {
      legacyKey: item.key || "",
    },
  }));

  const galleryItems = galleryData.images.map((item, index) => ({
    type: "galleryItem",
    title: item.title,
    slug: item.thumb || "",
    status: "published",
    images: item.src && item.thumb ? [item.thumb] : [],
    metadata: {
      legacyKey: item.key || "",
    },
  }));

  const news = newsData.map((item) => ({
    type: "news",
    slug: item.slug,
    title: item.title || titleFromSlug(item.slug),
    status: "published",
    body: item.para || "",
    images: item.images || [],
    metadata: {
      legacyKey: item.key || "",
    },
  }));

  const activities = activityData.map((item) => ({
    type: "activity",
    slug: item.key,
    title: item.title || titleFromSlug(item.key),
    status: "published",
    body: item.para || "",
    images: item.images || [],
    metadata: {
      legacyKey: item.key || "",
    },
  }));

  const teamMembers = profileData.map((item) => ({
    type: "teamMember",
    slug: item.key,
    title: item.name,
    status: "published",
    summary: item.designation || "",
    body: item.description || "",
    images: item.img ? [item.img] : [],
    metadata: {
      legacyKey: item.key || "",
      designation: item.designation || "",
      email: item.mail || "",
    },
  }));

  const rabiesPages = rabiesData.map((item) => ({
    type: "rabiesPage",
    slug: item.key,
    title: item.title || titleFromSlug(item.key),
    status: "published",
    body: item.para || "",
    images: item.img || [],
    metadata: {
      legacyKey: item.key || "",
    },
  }));

  return [...news, ...activities, ...teamMembers, ...rabiesPages, ...profiles, ...galleryItems, ...statItems];
}

export async function POST(request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  await connectMongo();

  const items = normalizeItems();

  const results = await Promise.all(
    items.map((item) =>
      ContentItem.findOneAndUpdate(
        { type: item.type, slug: item.slug },
        {
          $set: item,
          $setOnInsert: {
            publishedAt: new Date(),
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        },
      ),
    ),
  );

  return NextResponse.json({
    imported: results.length,
    byType: results.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {}),
  });
}