import express from "express";

import { RenderController } from "../controllers";

const router = express.Router();

router.post("/render", RenderController.Render);

export { router };
