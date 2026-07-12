import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            default: "about",
            enum: ["about"],
        },
        title: {
            type: String,
            required: true,
            default: "About Us",
        },
        slug: {
            type: String,
            default: "about",
        },
        status: {
            type: String,
            default: "published",
            enum: ["published", "draft"],
        },
    },
    { timestamps: true }
);

aboutSchema.index({ type: 1, slug: 1 }, { unique: true });

const About =
    mongoose.models.About ||
    mongoose.model("About", aboutSchema);

export default About;