import Project from "../models/Project.js";

// Get all Projects
export const getAllProjects = async(req, res) => {
  try {
    const {keyword} = req.query
    if(!keyword){
      const {data, total} = await Project.getAllProjects()
  
      res.status(200).json({
        status: 'success',
        data,
        totalData: total,
        message: "Projects fetched successfully"
      });
    } else {
      const data = await Project.searchProject(keyword);
  
      res.status(200).json({
        status: 'success',
        project: data,
        message: "Projects fetched successfully"
      });
    }

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getAllProject = async(req, res) => {
  try {
    const {page = 1, limit = 10} = req.query
    const data = await Project.getAllProject(parseInt(page), parseInt(limit));

    res.status(200).json({
      status: 'success',
      project: data,
      message: "Projects fetched successfully"
    });

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// Get Project by id
export const getProjectById = async(req, res) => {
  const {id_project} = req.params

  try {
    const project = await Project.getProjectById(parseInt(id_project))
    
    if(project){
      res.status(200).json({
        status: 'success',
        data: project,
        message: "Projects fetched successfully"
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: "Projects not found"
      });
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// Add Project
export const postProject = async(req, res) => {
  const projectData = req.body;

  try {
    const newProject = await Project.postProject(projectData)
    res.status(201).json({
      status: 'success',
      data: newProject,
      message: 'Project created successfully'
    })
  } catch (error) {
    console.error("Error created project:", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

// Update project by id
export const updateProjectById = async(req, res) => {
  const {id_project} = req.params;
  const projectData = req.body;

  try {
    const updateProject = await Project.updateProjectById(projectData, parseInt(id_project))
    res.status(200).json({
      status: 'success',
      data: updateProject,
      message: 'Project updated successfully'
    })
  } catch (error) {
    console.error("Error update project:", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

// Delete project by id
export const deleteProjectById = async(req, res) => {
  const {id_project} = req.params

  try {
    const projectDelete = await Project.deleteProjectById(parseInt(id_project));
    res.status(200).json({
      status: 'success',
      data: projectDelete,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error("error deleted project:", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}
