import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        subject: {
            type: String,
            required: false,
            trim: true,
            default: "",
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        source: {
            type: String,
            enum: ["contact-us", "footer", "contact-form"],
            default: "contact-form",
        },
        status: {
            type: String,
            enum: ["new", "read", "replied", "archived"],
            default: "new",
        },
    },
    { timestamps: true }
);

const Contact =
    mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
