import { NextResponse } from "next/server";
import { connectMongo } from "../../../../src/lib/mongodb";
import ContentItem from "../../../../src/models/ContentItem";

export const revalidate = 3600;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const limit = Number(searchParams.get("limit") || 50);

  console.log("Database Connection Test")
  console.log(process.env.MONGODB_URI)
  await connectMongo();

  const query = { status: "published" };
  if (type) {
    query.type = type;
  }

  const items = await ContentItem.find(query)
    .sort({ publishedAt: -1, updatedAt: -1 })
    .limit(Math.min(limit, 100))
    .lean();
  console.log("items length " + items.length);
  return NextResponse.json({ items });
}