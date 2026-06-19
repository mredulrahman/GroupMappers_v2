import { NextResponse } from "next/server";
import bythenumbers from "../schema/bythenumbersSchema";
import { connectMongo } from "../../../src/lib/mongodb";

// GET ONE
export async function GET(_request, { params }) {
    await connectMongo();

    const item = await bythenumbers.findById(params.id);

    return NextResponse.json(item);
}

// UPDATE
export async function PUT(request, { params }) {
    await connectMongo();

    const body = await request.json();

    const updated = await bythenumbers.findByIdAndUpdate(
        params.id,
        body,
        {
            new: true,
            runValidators: true,
        }
    );

    return NextResponse.json(updated);
}

// DELETE
export async function DELETE(_request, { params }) {
    await connectMongo();

    await bythenumbers.findByIdAndDelete(params.id);

    return NextResponse.json({
        success: true,
    });
}