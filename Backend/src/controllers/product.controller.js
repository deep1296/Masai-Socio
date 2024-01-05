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

const getProducts = asyncHandler(async (req, res) => {
   try {
      const products = await Product.find();
      res.status(200).json(
         new ApiResponse(200, products, "Products fetched successfully")
      );
   } catch (error) {
      throw new ApiError(
         400,
         "Something went wrong while fetching the products"
      );
   }
});

const getSingleProduct = asyncHandler(async (req, res) => {
   const productId = req.params.id;
   try {
      const product = await Product.findById(productId);
      if (!product) {
         throw new ApiError(404, "Product not found");
      }
      res.status(200).json(
         new ApiResponse(200, product, "Product fetched successfully")
      );
   } catch (error) {
      throw new ApiError(
         400,
         "Something went wrong while fetching the product"
      );
   }
});

const updateProduct = asyncHandler(async (req, res) => {
   const productId = req.params.id;
   const data = req.body;
   console.log(productId);
   try {
      const product = await Product.findByIdAndUpdate(productId, data, {
         new: true,
      });
      res.status(200).json(
         new ApiResponse(200, product, "Product updated successfully")
      );
   } catch (error) {
      throw new ApiError(
         400,
         "Something went wrong while updating the product"
      );
   }
});


export { addProduct, getProducts, getSingleProduct, updateProduct };
