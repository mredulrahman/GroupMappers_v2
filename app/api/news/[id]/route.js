import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import News from "../../schema/newsSchema";

// GET ONE
export async function GET(_req, { params }) {
    await connectMongo();

    const item = await News.findById(params.id);

    return NextResponse.json(item);
}

// UPDATE
export async function PUT(req, { params }) {
    await connectMongo();

    const body = await req.json();

    const updated = await News.findByIdAndUpdate(
        params.id,
        body,
        {
            new: true,
            runValidators: true,
        }
    );

    return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req, { params }) {
    await connectDB();

    await LatestNews.findByIdAndDelete(params.id);

    return NextResponse.json({
        success: true,
    });
}