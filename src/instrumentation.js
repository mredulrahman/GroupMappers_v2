import { connectMongo } from "./lib/mongodb";

export async function register() {
  console.log("🚀 Next.js starting up... Connecting to MongoDB globally");
  await connectMongo();
}