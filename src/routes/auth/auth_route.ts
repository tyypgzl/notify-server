import express from "express";

import AuthController from "../../controllers/auth_controller";

const router = express.Router();

router.get("/login", AuthController.login);

export default router;