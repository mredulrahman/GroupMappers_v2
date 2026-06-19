import { NextResponse } from "next/server";
import ContentItem from "../../../src/models/ContentItem";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        const query = type ? { type, status: "published" } : { status: "published" };
        const data = await ContentItem.find(query).sort({ publishedAt: -1 }).lean();

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const document = await ContentItem.create(body);

        return NextResponse.json({ success: true, data: document }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}