import { NextResponse } from "next/server";
import { connectMongo } from "../../../../src/lib/mongodb.js";
import Activity from "../../schema/activitySchema.js";

export async function GET(req, { params }) {
    try {
        await connectMongo();
        const p = await params;
        const activity = await Activity.findOne({ key: p.id });
        
        if (!activity) {
            return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, data: activity });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectMongo();
        const p = await params;
        const body = await req.json();
        const activity = await Activity.findOneAndUpdate({ key: p.id }, body, { new: true, runValidators: true });
        
        if (!activity) {
            return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, data: activity });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectMongo();
        const p = await params;
        const activity = await Activity.findOneAndDelete({ key: p.id });
        
        if (!activity) {
            return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
