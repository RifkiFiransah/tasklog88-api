import * as taskController from "../controllers/TaskController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/tasks", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  taskController.getAllTasks
);

router.get("/tasks/:id_task", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  taskController.getTaskById
);

router.get("/tasks/user", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  taskController.getTaskByUser
);

router.put("/tasks/user", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  taskController.updateTaskByUser
);

router.post("/tasks", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  taskController.postTask
);

router.put("/tasks/:id_task", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  taskController.updateTaskById
);

router.delete("/tasks/:id_task", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  taskController.deleteTaskById
);

export default router;
