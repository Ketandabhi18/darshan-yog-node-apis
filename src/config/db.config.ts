import { Db, MongoClient } from "mongodb";

let db: Db;
const connection = () => {
  try {
    let mongo_url: string = process.env.MONGODB_URL ?? "";
    const client = new MongoClient(mongo_url);
    db = client.db("darshan-yog");
    console.log("Database connection successfully.");
  } catch (error) {
    console.log("connection :: error :: ", error);
  }
};

export { connection, db };
