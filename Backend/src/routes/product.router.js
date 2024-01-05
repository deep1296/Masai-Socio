import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import {
   addProduct,
   getProducts,
   getSingleProduct,
   updateProduct,
} from "../controllers/product.controller.js";
import authentication from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addProduct").post(
   upload.fields([
      {
         name: "image",
         maxCount: 1,
      },
   ]),
   authentication,
   addProduct
);

router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/update/:id").patch(authentication, updateProduct);

export default router;
