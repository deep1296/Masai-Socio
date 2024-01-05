import { Router } from "express";
import authentication from "../middlewares/auth.middleware.js";
import {
   addToCart,
   getCart,
   removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/").get(authentication, getCart);
router.route("/add/:id").post(authentication, addToCart);
router.route("/remove/:id").post(authentication, removeFromCart);

export default router;
