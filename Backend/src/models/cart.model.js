import { Schema, model } from "mongoose";

const cartSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
      products: [
         {
            product: {
               type: Schema.Types.ObjectId,
               ref: "Product",
            },
            quantity: {
               type: Number,
               required: true,
            },
         },
      ],
   },
   { timestamps: true }
);

const Cart = model("Cart", cartSchema);

export default Cart;
