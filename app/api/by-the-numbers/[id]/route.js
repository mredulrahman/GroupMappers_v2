import { NextResponse } from "next/server";
import bythenumbers from "../../schema/bythenumbersSchema";
import { connectMongo } from "../../../src/lib/mongodb";

// GET ONE
// export async function GET(_request, { params }) {
//     await connectMongo();

//     const item = await bythenumbers.findById(params.id);

//     return NextResponse.json(item);
// }

// UPDATE
export async function PUT(request, { params }) {
    const { id } = await params;
    await connectMongo();

    const body = await request.json();

    const updated = await bythenumbers.findOneAndUpdate(
        { key: id },
        body,
        {
            new: true,
            runValidators: true,
        }
    ).lean();

    if (!updated) {
        return NextResponse.json(
            { success: false, message: "Not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { success: true, item: updated },
        { status: 200 }
    );
}

// DELETE
export async function DELETE(_request, { params }) {
    const { id } = await params;
    await connectMongo();

    const updated = await bythenumbers.findOneAndDelete(
        { key: id },
    ).lean();

    if (!updated) {
        return NextResponse.json(
            { success: false, message: "Not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { success: true, message: "Deleted successfully" },
        { status: 200 }
    );
}