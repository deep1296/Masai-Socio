import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
      optionsSuccessStatus: 200,
   })
);

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoute from "./routes/user.router.js";
import categoryRoute from "./routes/category.router.js";
import productRoute from "./routes/product.router.js";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);

export default app;
