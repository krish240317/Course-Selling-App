import { Router } from "express";
import { verifyJwt } from "../middlewares/verify.middleware.js";
import {addContent, addcourse} from "../controllers/instructor/addcourse.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 
const router = Router();

router.route("/addcourse").post(verifyJwt, addcourse);
router.route("/upload-video").post(verifyJwt,upload.single('video'), addContent);

export default router;