import mongoose from "mongoose";

const ContentItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      index: true,
      enum: [
        "page",
        "home",
        "profiles",
        "bytheNumbers",
        "news",
        "project",
        "projects",
        "activity",
        "activities",
        "teamMember",
        "team",
        "galleryItem",
        "gallery",
        "rabiesPage",
        "navigation",
        "siteSetting",
        "contact-us",
        "donate-us",
        "footer",
        "contact",
      ],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true
    },
    summary: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    blocks: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

ContentItemSchema.index({ type: 1, slug: 1 }, { unique: true });

const ContentItem =
  mongoose.models.ContentItem || mongoose.model("ContentItem", ContentItemSchema);

export default ContentItem;
