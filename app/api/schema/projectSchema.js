import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    text: { type: String },
    src: { type: String },
    alt: { type: String },
}, { _id: false });

const projectSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    label: { type: String },
    url: { type: String },
    year: { type: String },
    status: { type: String },
    category: { type: String, required: true }, // 'disease' or 'nonDisease'
    diseaseKey: { type: String }, // e.g. 'malaria', null if nonDisease
    diseaseTitle: { type: String },
    content: [contentSchema]
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
