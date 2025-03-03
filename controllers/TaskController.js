import Task from "../models/Task.js";

export const getAllTasks = async(req, res) => {
  try {
    const {keyword} = req.query
    if(!keyword){
      const {data, total} = await Task.getAllTasks();
  
      res.status(200).json({
        status: 'success',
        data,
        total,
        message: 'Tasks fetched successfully'
      });
    } else {
      const data = await Task.searchTasks(keyword);
  
      res.status(200).json({
        status: 'success',
        data,
        message: 'Tasks fetched successfully'
      });
    }
  } catch (error) {
    console.error("Error get all tasks: ", error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const getAllTask = async(req, res) => {
  const {page = 1, limit = 10}= req.query;

  try {
    const data = await Task.getAllTask(parseInt(page), parseInt(limit));

    res.status(200).json({
      status: 'success',
      data,
      message: 'Task limit offset fetched successfully'
    });
  } catch (error) {
    console.error("Error get limit offset tasks: ", error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const getTaskByUser = async(req, res) => {
  const id_user = req.userId;
  console.log(id_user);
  
  try {
    const {data, total} = await Task.getTaskByUserId(parseInt(id_user));
    
    if(data){
      res.status(200).json({
        status: 'success',
        data,
        total,
        message: 'Task by user id fetched successfully'
      });
    } else {
      res.status(404).json({
        status: 'error',
        data,
        message: 'Task by user id not found'
      });
    }
  } catch (error) {
    console.error("Error task: ", error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const getTaskByProjectId = async(req, res) => {
  const {id_project} = req.params;
  console.log(id_project);
  
  try {
    const {data, total} = await Task.getTaskByProjectId(parseInt(id_project));
    
    if(data){
      res.status(200).json({
        status: 'success',
        data,
        total,
        message: 'Task by project id fetched successfully'
      });
    } else {
      res.status(404).json({
        status: 'error',
        data,
        message: 'Task by project id not found'
      });
    }
  } catch (error) {
    console.error("Error task: ", error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const getDetailTaskByUserId = async(req, res) => {
  const {id_task} = req.params;
  const id_user = req.userId

  try {
    const data = await Task.getDetailTaskByUserId(parseInt(id_user), parseInt(id_task));
    
    if(data){
      res.status(200).json({
        status: 'success',
        data,
        message: 'Task by user id fetched successfully'
      });
    } else {
      res.status(404).json({
        status: 'error',
        data,
        message: 'Task by user id not found'
      });
    }
  } catch (error) {
    console.error("Error get task: ", error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const getTaskByUserProjectId = async(req, res) => {
  const  {id_project} = req.params;
  const id_user = req.userId

  try {
    const data = await Task.getTaskByUserProjectId(parseInt(id_user), parseInt(id_project));
    
    if(data){
      res.status(200).json({
        status: 'success',
        data,
        message: 'Task by project id fetched successfully'
      });
    } else {
      res.status(404).json({
        status: 'error',
        data,
        message: 'Task by project id not found'
      });
    }
  } catch (error) {
    console.error("Error get task: ", error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const getTaskById = async(req, res) => {
  const {id_task} = req.params;

  try {
    const data = await Task.getTaskById(parseInt(id_task));
    
    if(data){
      res.status(200).json({
        status: 'success',
        data,
        message: 'Task by id fetched successfully'
      });
    } else {
      res.status(404).json({
        status: 'error',
        data,
        message: 'Task by id not found'
      });
    }
  } catch (error) {
    console.error("Error get task: ", error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const postTask = async(req, res) => {
  const dataTask = req.body;
  try {
    const data = await Task.addTask(dataTask);

    res.status(201).json({
      status: 'success',
      data,
      message: 'Add new task data successfully'
    });
  } catch (error) {

    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const updateTaskByUser = async(req, res) => {
  const {id_task} = req.params;
  const id_user = req.userId
  const dataTask = req.body;

  try {
    const result = await Task.updateStatusTaskByUser(dataTask, parseInt(id_user), parseInt(id_task));

    if(result) {
      res.status(200).json({
        status: 'success',
        data: result,
        message: "Task updated successfully"
      });
    } else {
      console.log(result);
      
      res.status(404).json({
        status: 'error',
        message: "Task not found"
      });
    }
  } catch (error) {
    console.error("Error update task: ", error.message);
    
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const updateTaskById = async(req, res) => {
  const {id_task} = req.params;
  const dataTask = req.body;

  try {
    const result = await Task.updateTaskById(dataTask, parseInt(id_task));

    if(result) {
      res.status(200).json({
        status: 'success',
        data: result,
        message: "Task updated successfully"
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: "Task not found"
      });
    }
  } catch (error) {
    console.error("Error update task: ", error.message);
    
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export const deleteTaskById = async(req, res) => {
  const {id_task} = req.params;
  try {
    const result = await Task.deleteTaskById(parseInt(id_task));
    if(result){
      res.status(200).json({
        status: 'success',
        message: 'Task deleted successfully'
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Task not found'
      })
    }
  } catch (error) {
    console.error("Error deleted task: ", error.message);
    
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}