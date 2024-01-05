import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const getCart = asyncHandler(async (req, res) => {
   try {
      const userId = req.user._id;

      if (!userId) {
         throw new ApiError(404, "User not found");
      }

      const cart = await Cart.findOne({ userId })
         .populate({
            path: "items.productId",
            model: "Product",
         })
         .populate({
            path: "userId",
            model: "User",
         });

      if (!cart) {
         return res.status(404).json({ error: "Cart not found" });
      }

      res.status(200).json(
         new ApiResponse(200, cart, "Cart retrieved successfully")
      );
   } catch (error) {
      throw new ApiError(
         404,
         error?.message ||
            "Something went wrong while fetching products from Cart"
      );
   }
});

const addToCart = asyncHandler(async (req, res) => {
   try {
      const userId = req.user._id;
      const productId = req.params.id;
      
      if (!userId) {
         throw new ApiError(404, "Unauthorized request for adding to cart");
      }

      const quantity = parseInt(req.body.quantity) || 1;

      const product = await Product.findById(productId);

      if (!product) {
         return res.status(404).json({ error: "Product not found" });
      }

      let cart = await Cart.findOne({ userId });

      if (!cart) {
         cart = new Cart({ userId, items: [] });
      }

      const cartItemIndex = cart.items.findIndex((item) =>
         item.productId.equals(productId)
      );

      if (cartItemIndex !== -1) {
         // If the product is already in the cart, update the quantity
         cart.items[cartItemIndex].quantity += quantity;
      } else {
         cart.items.push({ productId, quantity });
      }

      await cart.save();

      res.status(201).json(
         new ApiResponse(201, cart, "Product added to cart successfully")
      );
   } catch (error) {
      console.error(error);
      throw new ApiError(
         401,
         "Something went wrong while adding product in cart"
      );
   }
});

const removeFromCart = asyncHandler(async (req, res) => {
   try {
      const userId = req.user._id;
      const productId = req.params.id;

      const cart = await Cart.findOne({ userId });

      if (!cart) {
         return res.status(404).json({ error: "Cart not found" });
      }

      const cartItemIndex = cart.items.findIndex((item) =>
         item.productId.equals(productId)
      );

      if (cartItemIndex === -1) {
         return res.status(404).json({ error: "Item not found in the cart" });
      }

      cart.items.splice(cartItemIndex, 1);

      const newCart = await cart
         .save({
            validateBeforeSave: false,
         })

      res.status(201).json(
         new ApiResponse(200, newCart, "Product removed from cart successfully")
      );
   } catch (error) {
      console.error(error);
      res.status(404).json(
         new ApiError(
            404,
            "Something went wrong while removing product from cart"
         )
      );
   }
});

export { getCart, addToCart, removeFromCart };
