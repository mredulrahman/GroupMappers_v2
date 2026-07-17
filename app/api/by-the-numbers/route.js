import { NextResponse } from "next/server";
import bythenumbers from "../schema/bythenumbersSchema";
import { connectMongo } from "../../../src/lib/mongodb";

// GET ALL
export async function GET(_request) {
    try {
        await connectMongo();

        const data = await bythenumbers.find({}).lean();

        return NextResponse.json({ success: true, items: data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// CREATE
export async function POST(request) {
    try {
        await connectMongo();

        const body = await request.json();
        const newEntry = {
            key: body.key || "",
            icon: body.icon || "",
            value: body.value || "",
            label: body.label || "",
        };

        const result = await bythenumbers.findOneAndUpdate(
            { key: newEntry.key },
            { $set: newEntry },
            { upsert: true, new: true, runValidators: false }
        );

        console.log("Created/Updated:", result);
        return NextResponse.json({ success: true, item: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}