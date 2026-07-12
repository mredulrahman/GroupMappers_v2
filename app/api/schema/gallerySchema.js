import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
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
    },
    { timestamps: true }
);

const Gallery =
    mongoose.models.Gallery ||
    mongoose.model("Gallery", gallerySchema);

export default Gallery;