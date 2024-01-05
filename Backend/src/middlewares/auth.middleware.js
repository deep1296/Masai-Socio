import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const authentication = asyncHandler(async (req, res, next) => {
   try {
      const token =
         req.header("Authorization")?.replace("Bearer ", "") ||
         req.cookies?.accessToken;

      if (!token) {
         throw new ApiError(400, "Unauthenticated request");
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded._id).select("-password");

      if (!user) {
         throw new ApiError(400, "invalid user token");
      }

      req.user = user;
      next();
   } catch (error) {
      throw new ApiError(400, error?.message || "Invalid request");
   }
});

export default authentication;
