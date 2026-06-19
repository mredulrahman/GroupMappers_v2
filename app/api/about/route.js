import { NextResponse } from "next/server";
import About from "../../../src/models/aboutSchema";
import { connectMongo } from "../../../src/lib/mongodb";

export async function GET(_request) {
    try {
        await connectMongo();
        // Fetch actual documents from the About collection
        const data = await About.find({ status: "published" }).lean();

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectMongo();
        const body = await request.json();
        
        // Use findOneAndUpdate with upsert: true to prevent duplicate key errors 
        // since the schema has a unique index on { type: 1, slug: 1 }
        const query = { 
            type: body.type || "about", 
            slug: body.slug || "about" 
        };
        
        const items = await About.findOneAndUpdate(query, body, { 
            new: true, 
            upsert: true,
            setDefaultsOnInsert: true
        });

        return NextResponse.json({ success: true, items }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}