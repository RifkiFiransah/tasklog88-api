import Project from "../models/projectModel.js";

// Get all Project
export const getAllProjects = async(req, res) => {
  try {
    const {data, total} = await Project.getAllProjects()

    res.status(200).json({
      status: 'success',
      project: {
        data,
        totalData: total
      },
      message: "Projects fetched successfully"
    });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getProjectById = async(req, res) => {
  const {id_project} = req.params

  try {
    const project = await Project.getProjectById(parseInt(id_project))

    res.status(200).json({
      status: 'success',
      data: project,
      message: "Projects fetched successfully"
    });
  } catch (error) {
    console.log(req.params);
    res.status(500).json({message: error.message})
  }
}

export const postProject = async(req, res) => {
  const projectData = req.body;

  try {
    const newProject = await Project.postProject(projectData)
    res.status(201).json({
      message: 'success',
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
