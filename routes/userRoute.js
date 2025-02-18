import express from "express";
import * as userController from "../controllers/UserController.js";

const router = express.Router()

// Route for user without authentication and authorization
router.get("/users", userController.GetAllUsers)
router.get("/users/:id_user", userController.GetUserById)
router.post("/users/", userController.AddUser)
router.put("/users/:id_user", userController.UpdateUserById)
router.delete("/users/:id_user", userController.DeleteUserById)

export default router
