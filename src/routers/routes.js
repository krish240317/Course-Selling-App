import { Router } from "express";
import { checkk, login, signup } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/verify.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/ok").post(verifyJwt, checkk);

export default router;