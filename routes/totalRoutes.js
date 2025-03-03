import * as authMiddleware from "../middlewares/authMiddleware.js";
import * as pengerjaanController from "../controllers/PengerjaanController.js";
import * as projectController from "../controllers/ProjectController.js";
import express from "express";

const router = express.Router();

router.get("/projects/total/:id_user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(['peserta']),
  projectController.countProject
);

router.get("/pengerjaans/total/:id_user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(['peserta']),
  pengerjaanController.countPengerjaan
);

export default router;


