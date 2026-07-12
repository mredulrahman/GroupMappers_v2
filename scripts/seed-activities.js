import mongoose from "mongoose";
import Activity from "../app/api/schema/activitySchema.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

async function seed() {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "groupmappers_db",
        });
        console.log("✅ Connected to MongoDB");

        const dataPath = path.join(process.cwd(), "src", "assets", "data", "activity-data.json");
        const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
        
        await Activity.deleteMany({});
        console.log("🗑️ Cleared existing activities");

        const activitiesToInsert = data.map(item => ({
            key: item.key,
            title: item.title || null,
            para: item.para,
            images: item.images || []
        }));

        await Activity.insertMany(activitiesToInsert);
        console.log(`✅ Inserted ${activitiesToInsert.length} activities`);

        mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}

seed();
