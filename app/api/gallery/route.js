import { NextResponse } from "next/server";
import Gallery from "../schema/gallerySchema";
import { connectMongo } from "../../../src/lib/mongodb";

// GET ALL
export async function GET() {
    try {
        await connectMongo();

        const galleries = await Gallery.find().sort({ createdAt: -1 });

        return NextResponse.json(galleries, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// CREATE
export async function POST(request) {
    try {
        await connectMongo();

        const body = await request.json();

        const gallery = await Gallery.create({
            src: body.src,
            thumb: body.thumb,
            alt1: body.alt1,
            alt2: body.alt2,
        });

        return NextResponse.json(gallery, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}