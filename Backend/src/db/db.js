import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDb = async () => {
   try {
      const connectionInstance = await mongoose.connect(
         `${process.env.MONGODB_URL}/${DB_NAME}`
      );
      console.log(`Connected to ${connectionInstance.connection.host}`);
   } catch (error) {
      console.log("MongoDB connection error: " + error);
      process.exit(1);
   }
};
