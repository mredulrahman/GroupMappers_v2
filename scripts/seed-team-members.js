import mongoose from "mongoose";
import TeamMember from "../app/api/schema/teamMemberSchema.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { connectMongo } from "../src/lib/mongodb.js";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;


if (!MONGO_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
}


async function seed() {
    try {
        console.log("✅ Connected to MongoDB");
        await mongoose.connect(MONGO_URI, {
            dbName: "groupmappers_db",
        });

        console.log(
            "✅ Connected to:",
            mongoose.connection.db.databaseName
        );
        const profilePath = path.join(
            process.cwd(),
            "src",
            "assets",
            "data",
            "profile.json"
        );

        const profiles = JSON.parse(
            fs.readFileSync(profilePath, "utf8")
        );
        await TeamMember.deleteMany({});

        const teamMembers = profiles.map((profile) => ({
            key: profile.key,
            name: profile.name,
            designation: profile.designation,
            description: profile.description,
            img: profile.img,
            mail: profile.mail,
            socialLink: profile.socialLink,
        }));

        await TeamMember.insertMany(teamMembers);
        // console.log(await TeamMember.collection.indexes());
        console.log(`✅ Inserted ${teamMembers.length} team members`);
        console.log("Profiles:", profiles.length);
        console.log(profiles);

        mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}

seed();