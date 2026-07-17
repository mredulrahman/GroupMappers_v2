import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        content: {
            type: String,
            required: false,
        },
        cardContent: {
            type: Array,
            required: false,
            default: []
        },
        slider: {
            type: Array,
            required: false,
            default: []
        },
        image: {
            type: mongoose.Schema.Types.Mixed,
            required: false,
        },
        url: {
            type: String,
            required: false
        },
        accordianContent: {
            type: Array,
            required: false,
            default: []
        },
        text: {
            type: String,
            required: false
        },
        btnLink: {
            type: String,
            required: false
        },
        items: {
            type: Array,
            required: false,
            default: []
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "published"
        }
    },
    { timestamps: true }
);

const Sections = mongoose.models.Sections || mongoose.model("Sections", SectionSchema);

export default Sections;
