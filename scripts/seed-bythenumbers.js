import mongoose from "mongoose";
import ByTheNumbers from "../app/api/schema/bythenumbersSchema.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

// const data = {
//     title: "By the Numbers",
//     slug: "home-stats",
//     status: "published",
//     stats: [
//         {
//             icon: "users",
//             value: "1200+",
//             label: "Members",
//         },
//         {
//             icon: "projects",
//             value: "250+",
//             label: "Projects",
//         },
//         {
//             icon: "globe",
//             value: "45+",
//             label: "Countries",
//         },
//         {
//             icon: "award",
//             value: "30+",
//             label: "Awards",
//         },
//     ],
// };

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
        const statPath = path.join(
            process.cwd(),
            "src",
            "assets",
            "data",
            "stat-data.json"
        );

        const parsed = JSON.parse(
            fs.readFileSync(statPath, "utf8")
        );
        const statItems = parsed.statItems;
        // await TeamMember.deleteMany({});
        console.log(typeof statItems);
        console.log(statItems);
        const stats = statItems.map((statItem) => ({
            key: statItem.key,
            icon: statItem.icon,
            value: statItem.value,
            label: statItem.label,
        }));

        await ByTheNumbers.deleteMany({});
        await ByTheNumbers.insertMany(stats);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seed();