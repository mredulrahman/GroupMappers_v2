import { NextResponse } from "next/server";
import Home from "../../../../../src/models/homeSchema";

const VALID_TYPES = ["bytheNumbers", "latestNews"];

export async function GET(_request, { params }) {
    const { type } = await params;

    if (!VALID_TYPES.includes(type)) {
        return NextResponse.json(
            { success: false, message: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}` },
            { status: 400 }
        );
    }

    try {
        const document = await Home.findOne({ type });

        if (!document) {
            return NextResponse.json(
                { success: false, message: `No document found for type "${type}"` },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: document }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    const { type } = await params;

    if (!VALID_TYPES.includes(type)) {
        return NextResponse.json(
            { success: false, message: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}` },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();

        delete body.type;
        delete body.slug;

        const slug = type;

        const document = await Home.findOneAndUpdate(
            { type, slug },
            { $set: { ...body, type, slug } },
            { new: true, upsert: true, runValidators: true }
        );

        return NextResponse.json({ success: true, data: document }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}

export async function DELETE(_request, { params }) {
    const { type } = await params;

    if (!VALID_TYPES.includes(type)) {
        return NextResponse.json(
            { success: false, message: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}` },
            { status: 400 }
        );
    }

    try {
        const document = await Home.findOneAndDelete({ type });

        if (!document) {
            return NextResponse.json(
                { success: false, message: `No document found for type "${type}"` },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: `"${type}" section deleted successfully` },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}