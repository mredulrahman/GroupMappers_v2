import { NextResponse } from "next/server";
import About from "../../../../src/models/aboutSchema";

export async function GET(_request, { params }) {
    const { id } = await params;
    try {
        const document = await About.findById(id);

        if (!document) {
            return NextResponse.json(
                { success: false, message: "Document not found" },
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
    const { id } = await params;
    try {
        const body = await request.json();

        const document = await About.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!document) {
            return NextResponse.json(
                { success: false, message: "Document not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: document }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}

export async function DELETE(_request, { params }) {
    const { id } = await params;
    try {
        const document = await About.findByIdAndDelete(id);

        if (!document) {
            return NextResponse.json(
                { success: false, message: "Document not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}