import * as pengerjaanController from "../controllers/PengerjaanController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/pengerjaans",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  pengerjaanController.getAllPengerjaans
);

router.get("/pengerjaan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  pengerjaanController.getAllPengerjaan
);

router.get("/pengerjaans/tasks/:id_task",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  pengerjaanController.getPengerjaanByTaskId
);

router.get("/pengerjaans/:id_pengerjaan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  pengerjaanController.getPengerjaanById
);

router.get("/pengerjaans/tasks/:id_task/:id_pengerjaan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  pengerjaanController.getDetailPengerjaanByTaskId
);

router.post("/pengerjaans",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta"]),
  pengerjaanController.postPengerjaan
);

router.put("/pengerjaans/:id_pengerjaan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta"]),
  pengerjaanController.updatePengerjaanByid
);

router.post("/log_pengerjaans/:id_pengerjaan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_kampus"]),
  pengerjaanController.postLogPengerjaan
);

export default router;