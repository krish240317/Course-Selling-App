import { Router } from "express";
import { verifyJwt } from "../middlewares/verify.middleware.js";
import {addcourse} from "../controllers/instructor/addcourse.controller.js";

const router = Router();

router.route("/addcourse").post(verifyJwt, addcourse);

export default router;