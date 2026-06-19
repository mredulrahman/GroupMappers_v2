import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "../../../../../src/lib/cmsAuth";
import { connectMongo } from "../../../../../src/lib/mongodb";
import ContentItem from "../../../../../src/models/ContentItem";

const patchSchema = z.object({
  type: z.string().optional(),
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  summary: z.string().optional(),
  body: z.string().optional(),
  images: z.array(z.string()).optional(),
  blocks: z.array(z.unknown()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  publishedAt: z.string().datetime().nullable().optional(),
});

export async function PATCH(request, { params }) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  const payload = patchSchema.parse(await request.json());

  if (payload.slug) {
    payload.slug = payload.slug.trim().toLowerCase();
  }

  if (payload.status === "published" && payload.publishedAt === undefined) {
    payload.publishedAt = new Date().toISOString();
  }

  await connectMongo();

  const item = await ContentItem.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();

  if (!item) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function DELETE(request, { params }) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;

  await connectMongo();

  const item = await ContentItem.findByIdAndDelete(id).lean();

  if (!item) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  return NextResponse.json({ deleted: true });
}