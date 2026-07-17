import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "../../../../src/lib/cmsAuth";
import { connectMongo } from "../../../../src/lib/mongodb";
import ContentItem from "../../../../src/models/ContentItem";

const contentSchema = z.object({
  type: z.enum([
    "page",
    "home",
    "profiles",
    "news",
    "project",
    "projects",
    "activity",
    "activities",
    "teamMember",
    "team",
    "galleryItem",
    "gallery",
    "rabiesPage",
    "navigation",
    "siteSetting",
    "contact-us",
    "donate-us",
    "footer",
    "contact",
  ]),
  slug: z.string().min(1),
  title: z.string().min(1),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  summary: z.string().optional().default(""),
  body: z.string().optional().default(""),
  images: z.array(z.string()).optional().default([]),
  blocks: z.array(z.unknown()).optional().default([]),
  metadata: z.record(z.string(), z.unknown()).optional().default({}),
  seo: z
    .object({
      title: z.string().optional().default(""),
      description: z.string().optional().default(""),
    })
    .optional()
    .default({}),
  publishedAt: z.string().datetime().nullable().optional(),
});

export async function GET(request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  await connectMongo();

  const query = {};
  if (type) query.type = type;

  const items = await ContentItem.find(query).sort({ updatedAt: -1 }).limit(100).lean();
  return NextResponse.json({ items });
}

export async function POST(request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const payload = contentSchema.parse(await request.json());
  const normalizedSlug = payload.slug.trim().toLowerCase();

  await connectMongo();

  const item = await ContentItem.create({
    ...payload,
    slug: normalizedSlug,
    publishedAt:
      payload.status === "published"
        ? payload.publishedAt || new Date()
        : payload.publishedAt || null,
  });

  return NextResponse.json({ item }, { status: 201 });
}
