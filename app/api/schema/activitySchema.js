import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    title: { type: String }, // Optional because some entries don't have titles
    para: { type: String, required: true },
    images: { type: [String], default: [] },
}, { timestamps: true });

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
