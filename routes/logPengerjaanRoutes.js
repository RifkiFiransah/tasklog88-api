import * as LogPengerjaanController from "../controllers/LogPengerjaanController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/pengerjaans/log/user/:id_user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta"]),
  LogPengerjaanController.getAllLogPengerjaanByUser
);

router.get("/pengerjaans/log/:id_log_pengerjaan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  LogPengerjaanController.getLogPengerjaanByIdLog
);

router.get("/pengerjaans/log_pengerjaan/:id_pengerjaan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  LogPengerjaanController.getLogPengerjaanByIdPengerjaan
);

// router.get("/pengerjaans/log_pengerjaan/detail/:id_log_pengerjaan/:id_pengerjaan",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
//   LogPengerjaanController.getDetailLogPengerjaan
// );

export default router;