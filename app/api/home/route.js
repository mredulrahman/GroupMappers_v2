import { NextResponse } from "next/server";
import { connectMongo } from "../../../src/lib/mongodb";
import Sections from "../schema/sectionSchema";

export async function GET() {
    try {
        await connectMongo();
        const sections = await Sections.find();
        return NextResponse.json(
            sections,
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectMongo();
        const body = await request.json();
        const newEntry = {
            key: body.key,
            title: body.title,
            content: body.content,
            url: body.url,
        };
        const section = await Sections.findOneAndUpdate({ key: newEntry.key }, newEntry, {
            upsert: true,
            new: true
        });
        return NextResponse.json(
            section,
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        await connectMongo();
        const body = await request.json();
        const updated =
            await Sections.findOneAndUpdate(
                { key: body.key },
                body,
                {
                    new: true
                }
            );
        return NextResponse.json(
            updated,
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        await connectMongo();
        const { _id } = await request.json();
        await Sections.findByIdAndDelete(_id);
        return NextResponse.json(
            {
                message: "Deleted successfully"
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message
            },
            { status: 500 }
        );
    }
}