import { Router } from "express";
import { login, signup } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/verify.middleware.js";
import dum from "../controllers/instructor/dum.js";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/verify").get(verifyJwt,dum);

export default router;