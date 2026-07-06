import { NextResponse } from "next/server";
import TeamMember from "../../schema/teamMemberSchema";
import { connectMongo } from "../../../../src/lib/mongodb";
import fs from "fs";
import path from "path";

const profilePath = path.join(process.cwd(), "src/assets/data/profile.json");

function getProfileData() {
    try {
        const fileContents = fs.readFileSync(profilePath, "utf8");
        return JSON.parse(fileContents);
    } catch (e) {
        return [];
    }
}

function saveProfileData(data) {
    fs.writeFileSync(profilePath, JSON.stringify(data, null, 4), "utf8");
}

function mapProfileToItem(p) {
    return {
        _id: String(p._id || p.id || p.key),
        type: "teamMember",
        slug: p.key,
        title: p.name,
        status: "published",
        summary: p.designation || "",
        body: p.description || "",
        images: p.img ? [p.img] : [],
        metadata: {
            email: p.mail || "",
            socialLink: p.socialLink || "",
        },
        updatedAt: p.updatedAt,
    };
}

export async function GET(_request, { params }) {
    try {
        const { id } = await params;
        await connectMongo();
        const query = id.match(/^[a-f\d]{24}$/i)
            ? { $or: [{ key: id }, { _id: id }] }
            : { key: id };
        const item = await TeamMember.findOne(query).lean();
        if (!item) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Team member not found",
                },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, item: mapProfileToItem(item) },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        await connectMongo();
        const body = await request.json();
        const update = {
            key: body.slug,
            name: body.title,
            designation: body.summary || "",
            description: body.body || "",
            img: body.images && body.images.length > 0 ? body.images[0] : "",
            mail: body.metadata?.email || "",
            socialLink: body.metadata?.socialLink || "",
        };
        const query = id.match(/^[a-f\d]{24}$/i)
            ? { $or: [{ key: id }, { _id: id }] }
            : { key: id };
        const item = await TeamMember.findOneAndUpdate(query, update, { new: true }).lean();
        if (!item) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Team member not found",
                },
                { status: 404 }
            );
        }
        // Update profile.json
        const data = getProfileData();
        const index = data.findIndex(d => d.key === body.slug || d.key === id);
        if (index !== -1) {
            data[index] = {
                ...data[index],
                key: body.slug || data[index].key,
                name: body.title || data[index].name,
                designation: body.summary || data[index].designation,
                description: body.body || data[index].description,
                img: body.images && body.images.length > 0 ? body.images[0] : data[index].img,
            };
        } else {
            // Fallback if not found in json but found in mongo
            data.push({
                key: body.slug,
                name: body.title,
                designation: body.summary,
                description: body.body,
                img: body.images && body.images.length > 0 ? body.images[0] : "",
            });
        }
        saveProfileData(data);
        return NextResponse.json(
            { success: true, item: mapProfileToItem(item) },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}

export async function DELETE(_request, { params }) {
    try {
        const { id } = await params;
        await connectMongo();
        const query = id.match(/^[a-f\d]{24}$/i)
            ? { $or: [{ key: id }, { _id: id }] }
            : { key: id };
        const item = await TeamMember.findOneAndDelete(query).lean();
        if (!item) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Team member not found",
                },
                { status: 404 }
            );
        }
        // Update profile.json
        const data = getProfileData();
        const filtered = data.filter(d => d.key !== item.key && d.key !== id);
        saveProfileData(filtered);
        return NextResponse.json(
            {
                success: true,
                message: "Deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
