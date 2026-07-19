import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Contact from "../app/api/schema/contactSchema.js";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactDataPath = path.join(__dirname, "../src/assets/data/contact-data.json");
const contactData = JSON.parse(readFileSync(contactDataPath, "utf8"));

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

const contactSeedItems = [
    {
        name: "GroupMappers Contact Us",
        email: contactData.email,
        subject: "Contact Us information",
        message: [
            `Phone: ${contactData.phone}`,
            `Address: ${contactData.address}`,
            `Map: ${contactData.mapEmbedUrl}`,
        ].join("\n"),
        source: "contact-us",
        status: "new",
    },
    {
        name: "GroupMappers Footer",
        email: contactData.email,
        subject: "Footer contact information",
        message: [
            `Phone: ${contactData.phone}`,
            `Address: ${contactData.address}`,
            `Copyright: ${contactData.copyright}`,
            `Facebook: ${contactData.socialLinks.facebook}`,
            `Twitter: ${contactData.socialLinks.twitter}`,
            `YouTube: ${contactData.socialLinks.youtube}`,
            `LinkedIn: ${contactData.socialLinks.linkedin}`,
            `Instagram: ${contactData.socialLinks.instagram}`,
        ].join("\n"),
        source: "footer",
        status: "read",
    },
    {
        name: "GroupMappers Contact Form",
        email: contactData.email,
        subject: "Default contact form recipient",
        message: `Contact form submissions should be sent to ${contactData.email}.`,
        source: "contact",
        status: "new",
    },
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "groupmappers_db",
        });
        console.log("✅ Connected to:", mongoose.connection.db.databaseName);

        const results = await Promise.all(
            contactSeedItems.map((item) =>
                Contact.findOneAndUpdate(
                    { source: item.source, email: item.email },
                    item,
                    {
                        new: true,
                        upsert: true,
                        runValidators: true,
                    }
                )
            )
        );

        console.log(`✅ Upserted ${results.length} contact records from contact-data.json`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
}

seed();
