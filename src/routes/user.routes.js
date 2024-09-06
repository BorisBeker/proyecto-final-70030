import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.delete("/:id", UserController.delete);
router.put("/:id", UserController.update);

export default router;