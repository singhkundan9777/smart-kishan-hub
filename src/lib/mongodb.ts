import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "smart_kisan_hub";

let clientPromise: Promise<MongoClient> | undefined;

if (uri) {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  if (!clientPromise) {
    throw new Error("Database not configured. Add MONGODB_URI to .env.local.");
  }
  const client = await clientPromise;
  return client.db(dbName);
}
