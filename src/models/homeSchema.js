import mongoose from "mongoose";

const StatItemSchema = new mongoose.Schema({
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
});

const NewsItemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const HomeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["bytheNumbers", "latestNews"],
      default: "bytheNumbers",
    },
    title: {
      type: String,
      required: true,
      default: "By the number",
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "draft",
      enum: ["archived", "published", "draft"],
    },
    stats: {
      type: [StatItemSchema],
      default: [],
    },
    newsItems: {
      type: [NewsItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Matches the existing compound unique index in MongoDB Atlas (type_1_slug_1)
HomeSchema.index({ type: 1, slug: 1 }, { unique: true });

const Home = mongoose.models.Home || mongoose.model("Home", HomeSchema);

export default Home;