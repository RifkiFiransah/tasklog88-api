import express from "express";
import * as authMiddleware from "../middlewares/authMiddleware.js"; 
import * as projectController from "../controllers/ProjectController.js"; // Make sure the controller file is created

const router = express.Router();

// Routes for project with auth and authorization

// Route Get All Projects
router.get(
  '/projects', 
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  projectController.getAllProjects
);

// Route Get Project By Id
router.get(
  '/projects/:id_project',
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["peserta", "pendamping_lapangan", "pendamping_kampus"]),
  projectController.getProjectById
);

// Route Add Project
router.post(
  '/projects',
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  projectController.postProject
) ;

// Route Update Project By Id
router.put(
  '/projects/:id_project',
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  projectController.updateProjectById
) ;

// Route Delete Project By Id
router.delete(
  '/projects/:id_project',
  authMiddleware.authenticate,
  authMiddleware.authorizeRole(["pendamping_lapangan"]),
  projectController.deleteProjectById
) ;


// Routes for Project without authentication and authorization
// router.get("/projects", projectController.getAllProjects);
// router.get("/projects/:id_project", projectController.getProjectById);
// router.post("/projects/", projectController.postProject);
// router.put("/projects/:id_project", projectController.updateProjectById);
// router.delete("/projects/:id_project", projectController.deleteProjectById);

export default router;