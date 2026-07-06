import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Sections from "../app/api/schema/sectionSchema.js";

dotenv.config({ path: ".env.local" });
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(
    __dirname,
    "../src/assets/data/homepage.json"
);

const homeSectionsData = JSON.parse(
    fs.readFileSync(jsonPath, "utf-8")
);

async function seed() {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "groupmappers_db",
        });
        console.log(
            "✅ Connected to:",
            mongoose.connection.db.databaseName
        );
        await Sections.deleteMany({});
        const inserted = await Sections.insertMany(homeSectionsData.sections);
        console.log(
            `✅ Inserted ${inserted.length} home sections`
        );
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
}
seed();