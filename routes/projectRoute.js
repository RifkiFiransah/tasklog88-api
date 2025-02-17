import express from "express";
import * as projectController from "../controllers/ProjectController.js"; // Make sure the controller file is created

const router = express.Router();

// Routes for Project
router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id_project", projectController.getProjectById);
router.post("/projects/", projectController.postProject);
router.put("/projects/:id_project", projectController.updateProjectById);
router.delete("/projects/:id_project", projectController.deleteProjectById);

export default router;