import { NextResponse } from "next/server";
import { connectMongo } from "../../../src/lib/mongodb.js";
import Activity from "../schema/activitySchema.js";

export async function GET(req) {
    try {
        await connectMongo();
        const activities = await Activity.find({});
        
        return NextResponse.json({ success: true, data: activities });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();
        const activity = await Activity.create(body);
        
        return NextResponse.json({ success: true, data: activity }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
