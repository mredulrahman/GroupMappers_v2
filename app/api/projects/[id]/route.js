import { NextResponse } from "next/server";
import { connectMongo } from "../../../../src/lib/mongodb.js";
import Project from "../../schema/projectSchema.js";

export async function GET(req, { params }) {
    try {
        await connectMongo();
        const p = await params;
        const project = await Project.findOne({ key: p.id });

        if (!project) {
            return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectMongo();
        const p = await params;
        const body = await req.json();
        const project = await Project.findOneAndUpdate({ key: p.id }, body, { new: true, runValidators: true });

        if (!project) {
            return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectMongo();
        const p = await params;
        const project = await Project.findOneAndDelete({ key: p.id });

        if (!project) {
            return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
