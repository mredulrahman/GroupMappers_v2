import { NextResponse } from "next/server";
import Home from "../../../../src/models/homeSchema";

export async function GET(_request, { params }) {
    const { id } = await params;
    try {
        const document = await Home.findById(id);

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

        const document = await Home.findByIdAndUpdate(
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
        const document = await Home.findByIdAndDelete(id);

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