import express from "express";
import * as userController from "../controllers/UserController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for user without authentication and authorization
router.get("/users", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan", "pendamping_kampus"]),
  userController.GetAllUsers
);
router.get("/user", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan", "pendamping_kampus"]),
  userController.GetAllUser
);
router.get("/users/:id_user", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(['peserta', "pendamping_lapangan", "pendamping_kampus"]),
  userController.GetUserById
);
router.post("/users/", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  userController.AddUser
);
router.put("/users/:id_user", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  userController.UpdateUserById
);
router.put("/users/password/:id_user", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(['peserta', "pendamping_lapangan"]),
  userController.UpdateUserWithPassword
);
router.delete("/users/:id_user", 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  userController.DeleteUserById
);

export default router
