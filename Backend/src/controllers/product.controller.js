import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Product from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudanary.js";

const addProduct = asyncHandler(async (req, res) => {
   const { title, description, price, oldPrice, rating } = req.body;
   if ([title, description].some((field) => field?.trim === "")) {
      throw new ApiError(400, "Product title and description is required");
   }

   const productImageLocalpath = req.files.image[0]?.path;
   // console.log(productImageLocalpath);
   if (!productImageLocalpath) {
      throw new ApiError(400, "Product image is required");
   }

   const productImage = await uploadOnCloudinary(productImageLocalpath);

   if (!productImage) {
      throw new ApiError(400, "Product image is required");
   }
   const product = await Product.create({
      title,
      description,
      price,
      oldPrice,
      rating,
      image: productImage.url,
   });

   res.status(201).json(
      new ApiResponse(201, product, "Product created successfully")
   );
});

export { addProduct };
