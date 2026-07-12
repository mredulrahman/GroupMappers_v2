import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
    {
        key: {
            type: String,
        },
        name: {
            type: String,
        },
        designation: {
            type: String,
        },
        description: {
            type: String,
        },
        img: {
            type: String,
            default: null,
        },
        mail: {
            type: String,
            default: null,
        },
        socialLink: {
            type: String,
            default: null,
        },
    },
    { strict: false, timestamps: true }
);

teamMemberSchema.index({ key: 1 }, { unique: true });

const TeamMember =
    mongoose.models.TeamMember ||
    mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;