import { Router } from "express";
import { upload } from "./middlewares/upload/multer.middleware";
import UserController from "./controllers/user.controller";

const router = Router();

router.post("/users", upload.single("avatar"), UserController.create);

export default router;
