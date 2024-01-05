import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Category from "../models/category.model.js";

const addCategory = asyncHandler(async (req, res) => {
   const { name, description, products } = req.body;

   if (name?.trim() == "") {
      throw new ApiError(400, "Category is required");
   }

   const existingCategory = await Category.findOne({ name });

   if (existingCategory) {
      throw new ApiError(400, "Category already exist");
   }

   const category = await Category.create({ name, description, products });

   if (!category) {
      throw new ApiError(500, "Something went wrong");
   }
   res.status(201).json(
      new ApiResponse(200, category, "Category created successfully")
   );
});

const getCategory = asyncHandler(async (req, res) => {
   const categories = await Category.find();
   res.status(200).json(
      new ApiResponse(200, categories, "Categories fetched successfully")
   );
});

export { addCategory, getCategory };
