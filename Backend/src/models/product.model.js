import { Schema, model } from "mongoose";

const productSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true,
      },
      category: {
         type: Schema.Types.ObjectId,
         ref: "Category",
         required: true,
      },
      description: {
         type: String,
         trim: true,
      },
      price: {
         type: Number,
         required: true,
      },
      oldPrice: {
         type: Number,
      },
      rating: {
         type: Number,
      },
      image: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
