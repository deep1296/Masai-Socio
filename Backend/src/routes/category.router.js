import { Router } from "express";
import {
   addCategory,
   getCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/addCategory").post(addCategory);

router.route("/getCategory").get(getCategory);

export default router;
