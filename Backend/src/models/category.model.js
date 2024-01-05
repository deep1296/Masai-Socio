import { Schema, model } from "mongoose";

const categorySchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      description: {
         type: String,
         trim: true,
      },
      products: [
         {
            type: Schema.Types.ObjectId,
            ref: "Product",
         }, 
      ],
   },
   { timestamps: true }
);

const Category = model("Category", categorySchema);

export default Category;
