import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = {
    conn: null,
    promise: null,
  };
}

export async function connectMongo() {
  if (cached.conn) {
    console.log("✅ MongoDB already connected (using cached connection)");
    return cached.conn;
  }

  if (!MONGODB_URI) {
    console.error("❌ MongoDB Error: Missing MONGODB_URI environment variable.");
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (!cached.promise) {
    console.log("⏳ MongoDB connecting...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "groupmappers_db",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully:", mongoose.connection.host);
    return cached.conn;
  } catch (error) {
    cached.promise = null; // reset so next call retries
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
}
