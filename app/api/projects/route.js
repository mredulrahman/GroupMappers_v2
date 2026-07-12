import { NextResponse } from "next/server";
import { connectMongo } from "../../../src/lib/mongodb.js";
import Project from "../schema/projectSchema.js";

export async function GET(req) {
    try {
        await connectMongo();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        const query = category ? { category } : {};
        const projects = await Project.find(query);

        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();
        const project = await Project.create(body);

        return NextResponse.json({ success: true, data: project }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
