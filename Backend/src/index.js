import dotenv from "dotenv";
import { connectDb } from "./db/db.js";
import app from "./app.js";

dotenv.config({ path: "./env" });
const port = process.env.PORT || 4040;

connectDb()
   .then(() => {
      app.listen(port, () => {
         console.log(`Server is running on port ${process.env.PORT}`);
      });
   })
   .catch((error) => {
      console.log("MongoDB connection Failed", error);
   });
