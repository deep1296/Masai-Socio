import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
   productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
   },
   quantity: {
      type: Number,
      default: 1,
   },
});

const cartSchema = new Schema(
   {
      userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      items: [cartItemSchema],
   },
   {
      timestamps: true,
   }
);

const Cart = model("Cart", cartSchema);

export default Cart;
