import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import TeamMember from "../schema/teamMemberSchema";
import { connectMongo } from "../../../src/lib/mongodb";

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

/**
 * Map a profile.json entry to the CMS-compatible item shape.
 * We synthesize a fake _id from the key so the admin panel can select/edit it.
 */
function mapProfileToItem(p) {
    return {
        _id: p.key,
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
    };
}

export async function GET(_request) {
    try {
        // await connectMongo();
        const profileData = await TeamMember.find({}).lean();
        const items = profileData.map(mapProfileToItem);

        console.log("items from DB");

        return NextResponse.json(
            { success: true, items },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store, max-age=0",
                },
                isItDB: true
            }
        );
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

        // Map CMS admin panel fields -> profile.json / schema fields
        const newEntry = {
            key: body.slug,
            name: body.title,
            designation: body.summary || "",
            description: body.body || "",
            img: body.images && body.images.length > 0 ? body.images[0] : "",
            mail: body.metadata?.email || "",
            socialLink: body.metadata?.socialLink || "",
        };

        // Save to MongoDB (using mapped fields)
        await TeamMember.findOneAndUpdate(
            { key: newEntry.key },
            { $set: newEntry },
            { upsert: true, new: true, runValidators: false }
        );

        const result = await TeamMember.findOneAndUpdate(
            { key: newEntry.key },
            { $set: newEntry },
            { upsert: true, new: true }
        );

        console.log("Saved:", result);
        // Save to profile.json
        const data = getProfileData();
        const existing = data.findIndex((d) => d.key === newEntry.key);
        if (existing !== -1) {
            data[existing] = newEntry;
        } else {
            data.push(newEntry);
        }
        saveProfileData(data);

        return NextResponse.json(
            { success: true, item: mapProfileToItem(newEntry) },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}