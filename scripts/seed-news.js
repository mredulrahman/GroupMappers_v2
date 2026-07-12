import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import News from "../app/api/schema/newsSchema.js";

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

        console.log(
            "✅ Connected to:",
            mongoose.connection.db.databaseName
        );

        const newsPath = path.join(
            process.cwd(),
            "src",
            "assets",
            "data",
            "news-data.json"
        );

        const newsData = JSON.parse(
            fs.readFileSync(newsPath, "utf8")
        );

        await News.deleteMany({});

        const newsDocuments = newsData.map((item) => ({
            key: item.key,
            slug: item.slug,
            para: item.para,
            images: item.images || [],
        }));

        await News.insertMany(newsDocuments);

        console.log(
            `✅ Inserted ${newsDocuments.length} news articles`
        );

        mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}

seed();