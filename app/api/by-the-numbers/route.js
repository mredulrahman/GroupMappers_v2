import { NextResponse } from "next/server";
import bythenumbers from "../schema/bythenumbersSchema";
import { connectMongo } from "../../../src/lib/mongodb";

// GET ALL
export async function GET(_request) {
    await connectMongo();

    const data = await bythenumbers.find();

    return NextResponse.json(data);
}

// CREATE
export async function POST(request) {
    await connectMongo();

    const body = await request.json();

    const created = await bythenumbers.create(body);

    return NextResponse.json(created, {
        status: 201,
    });
}