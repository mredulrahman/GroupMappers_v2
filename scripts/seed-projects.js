import mongoose from "mongoose";
import Project from "../app/api/schema/projectSchema.js";
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

        const dataPath = path.join(process.cwd(), "src", "assets", "data", "projectspage.json");
        const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        await Project.deleteMany({});
        console.log("🗑️ Cleared existing projects");

        const projectsToInsert = [];

        if (data.diseases) {
            data.diseases.forEach(disease => {
                if (disease.projects) {
                    disease.projects.forEach(p => {
                        projectsToInsert.push({
                            key: p.key,
                            title: p.title,
                            label: p.label,
                            url: p.url,
                            year: p.year,
                            status: p.status,
                            category: "disease",
                            diseaseKey: disease.key,
                            diseaseTitle: disease.title,
                            content: p.content || []
                        });
                    });
                }
            });
        }

        if (data.nonDiseases) {
            data.nonDiseases.forEach(p => {
                projectsToInsert.push({
                    key: p.key,
                    title: p.title,
                    label: p.label,
                    url: p.url,
                    year: p.year,
                    status: p.status,
                    category: "nonDisease",
                    diseaseKey: null,
                    diseaseTitle: null,
                    content: p.content || []
                });
            });
        }

        await Project.insertMany(projectsToInsert);
        console.log(`✅ Inserted ${projectsToInsert.length} projects`);

        mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}

seed();
