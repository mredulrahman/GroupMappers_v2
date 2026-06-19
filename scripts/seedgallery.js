import mongoose from "mongoose";
import Gallery from "../app/api/schema/gallerySchema.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

// const galleryData = [
//     {
//         src: "https://picsum.photos/id/1015/1200/800",
//         thumb: "https://picsum.photos/id/1015/300/200",
//         alt1: "Mountain Lake",
//         alt2: "Beautiful mountain lake view",
//     },
//     {
//         src: "https://picsum.photos/id/1025/1200/800",
//         thumb: "https://picsum.photos/id/1025/300/200",
//         alt1: "Golden Retriever",
//         alt2: "Cute dog portrait",
//     },
//     {
//         src: "https://picsum.photos/id/1040/1200/800",
//         thumb: "https://picsum.photos/id/1040/300/200",
//         alt1: "Beach Sunset",
//         alt2: "Sunset over the ocean",
//     },
// ];


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
        const galleryPath = path.join(
            process.cwd(),
            "src",
            "assets",
            "data",
            "galleryPage-data.json"
        );

        const parsed = JSON.parse(
            fs.readFileSync(galleryPath, "utf8")
        );
        const images = parsed.images;
        // await TeamMember.deleteMany({});
        console.log(typeof images);
        console.log(images);
        const galleries = images.map((gallery) => ({
            src: gallery.src,
            thumb: gallery.thumb,
            alt1: gallery.alt1,
            alt2: gallery.alt2,
        }));

        await Gallery.deleteMany({});
        console.log("Old gallery data removed");

        await Gallery.insertMany(galleries);
        console.log("Demo gallery data inserted");

        mongoose.connection.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seed();