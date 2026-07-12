import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    profileUrl: {
        type: String,
        required: true,
    },
});

const GallerySchema = new mongoose.Schema({
    src: {
        type: String,
        required: true,
    },
    thumb: {
        type: String,
        required: true,
    },
    alt1: {
        type: String,
        default: null,
    },
    alt2: {
        type: String,
        default: null,
    },
});

const aboutSchema = new mongoose.Schema({
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
    teamMembers: {
        type: [teamMemberSchema],
        default: [],
    },
    galleryImages: {
        type: [GallerySchema],
        default: [],
    },

}, { timestamps: true });

aboutSchema.index({ type: 1, slug: 1 }, { unique: true });
const About = mongoose.models.About || mongoose.model("About", aboutSchema);

export default About;