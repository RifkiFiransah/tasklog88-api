import Task from "../models/Task.js";

export const getAllTasks = async(req, res) => {
  try {
    const {data, total} = await Task.getAllTasks();

    res.status(200).json({
      status: 'success',
      data: {
        data,
        total
      },
      message: 'Tasks fetched successfully'
    });
  } catch (error) {
    console.error("Error get all tasks: ", error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

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

export const getTaskByUser = async(req, res) => {
  const id_user = req.userId;
  console.log(id_user);
  
  try {
    const data = await Task.getTaskByUserId(parseInt(id_user));
    
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
    console.error("Error task: ", error.message);
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
    const result = await Task.updateTaskById(dataTask, parseInt(id_user), parseInt(id_task));

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