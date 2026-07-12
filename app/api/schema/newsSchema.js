import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        para: {
            type: String,
            required: true,
        },

        images: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const News =
    mongoose.models.News ||
    mongoose.model("News", NewsSchema);

export default News;