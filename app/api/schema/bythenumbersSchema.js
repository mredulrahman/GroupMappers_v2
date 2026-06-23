import mongoose from "mongoose";

const bythenumbersSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true
        },
        icon: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const bythenumbers = mongoose.models.bythenumbers ||
    mongoose.model("bythenumbers", bythenumbersSchema);

export default bythenumbers;