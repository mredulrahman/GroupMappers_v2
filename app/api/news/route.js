import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import News from "../schema/newsSchema";

// GET ALL
export async function GET() {
    await connectMongo();

    const news = await News.find();

    return NextResponse.json(news);
}

// CREATE
export async function POST(request) {
    await connectMongo();

    const body = await request.json();

    const created = await News.create(body);

    return NextResponse.json(created, {
        status: 201,
    });
}