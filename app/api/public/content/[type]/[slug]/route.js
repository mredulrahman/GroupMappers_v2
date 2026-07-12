import { NextResponse } from "next/server";
import { connectMongo } from "../../../../../../src/lib/mongodb";
import ContentItem from "../../../../../../src/models/ContentItem";

export const revalidate = 3600;

export async function GET(_request, { params }) {
  const { type, slug } = await params;

  await connectMongo();

  const item = await ContentItem.findOne({
    type,
    slug,
    status: "published",
  }).lean();

  if (!item) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}