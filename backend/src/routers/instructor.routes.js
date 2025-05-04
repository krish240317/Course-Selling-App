import { Router } from "express";
import { verifyJwt } from "../middlewares/verify.middleware.js";
import {addContent} from "../controllers/instructor/addcourse.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 
import { getcourse } from "../controllers/instructor/getcourse.controller.js";
const router = Router();

// router.route("/addcourse").post(verifyJwt, addcourse);
router.route("/upload").post(verifyJwt,upload.fields([ { name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]), addContent);
router.route("/getcourse").get(verifyJwt,getcourse)
export default router;