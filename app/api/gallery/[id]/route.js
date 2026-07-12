import { NextResponse } from "next/server";
import Gallery from "../../schema/gallerySchema";
import { connectMongo } from "@/lib/mongodb";

// GET SINGLE
export async function GET(_request, { params }) {
    try {
        const { id } = await params;
        await connectMongo();
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            return NextResponse.json(
                { message: "Gallery not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(gallery, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// UPDATE
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        await connectMongo();
        const body = await request.json();
        const updatedGallery = await Gallery.findByIdAndUpdate(
            id,
            {
                src: body.src,
                thumb: body.thumb,
                alt1: body.alt1,
                alt2: body.alt2,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!updatedGallery) {
            return NextResponse.json(
                { message: "Gallery not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(updatedGallery, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// DELETE
export async function DELETE(_request, { params }) {
    try {
        const { id } = await params;
        await connectMongo();
        const deletedGallery = await Gallery.findByIdAndDelete(id);
        if (!deletedGallery) {
            return NextResponse.json(
                { message: "Gallery not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: "Gallery deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}