import sequelize from "../config/config.js";

const Task = {
  // Get All Tasks
  getAllTasks: async() => {
    try {
      const query = `
        SELECT
        task.id_task, task.nama_task, task.tgl_mulai_task, task.tgl_akhir_task, task.status_task,
        project.id_project, project.nama_project,
        user.username, user.nama_lengkap
        FROM task
        LEFT JOIN project ON task.id_project = project.id_project 
        LEFT JOIN user ON task.id_user = user.id_user
      `;

      const data = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      });

      const queryCount = `SELECT COUNT(*) AS total FROM task`

      const [countResult] = await sequelize.query(queryCount, {
        type: sequelize.QueryTypes.SELECT
      });
      console.log('Count Query Result: ', countResult);

      return {
        data,
        total: countResult.total
      }
    } catch (error) {
      throw new Error("Error fetching data: "+error.message);
    }
  },

  // get task by user id
  getTaskByUserId: async(userId) => {
    console.log(userId);

    const query = `
    SELECT 
      task.id_task, task.nama_task, task.tgl_mulai_task, task.tgl_akhir_task, task.status_task,
      project.id_project, project.nama_project
    FROM task
      LEFT JOIN project ON task.id_project = project.id_project
    WHERE task.id_user = ?
    `;

    const queryCount = `SELECT COUNT(*) as total FROM task WHERE id_user = ?`

    const data = await sequelize.query(query, {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT
    });
    
    const [countResult] = await sequelize.query(queryCount, {
      replacements: [userId],
      type: sequelize.QueryTypes.SELECT
    });

    return {
      data,
      total: countResult.total
    }
  },

  // Get Task By Id
  getTaskById: async(taskId) => {
    const query = `
      SELECT
        task.id_task, task.nama_task, task.tgl_mulai_task, task.tgl_akhir_task, task.status_task,
        project.id_project, project.nama_project,
        user.username, user.nama_lengkap
      FROM task 
        LEFT JOIN project ON task.id_project = project.id_project
        LEFT JOIN user ON task.id_user = user.id_user
      WHERE task.id_task = ?
    `;

    const data = await sequelize.query(query, {
      replacements: [taskId],
      type: sequelize.QueryTypes.SELECT
    });

    return data[0]
  },

  // Add Task
  addTask: async(taskData) => {
    const {id_project, nama_task, id_user, tgl_mulai_task, tgl_akhir_task, status_task} = taskData;

    const query = `
      INSERT INTO task (id_project, nama_task, id_user, tgl_mulai_task, tgl_akhir_task, status_task)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await sequelize.query(query, {
      replacements: [parseInt(id_project), nama_task, parseInt(id_user), tgl_mulai_task, tgl_akhir_task, status_task]
    });

    console.log("data: "+result);
    
    return {
      id_task: result.id,
      id_project, id_user, tgl_mulai_task, tgl_akhir_task, status_task
    }
  },

  // Update status Task by user
  updateStatusTaskByUser: async(statusTask, userId, taskId) => {
    const query = `
      UPDATE task SET status_task = ? WHERE task_id = ? AND WHERE id_user = ?
    `;

    const data = await sequelize.query(query, {
      replacements: [statusTask, taskId, userId]
    });

    console.log("data: "+data[0]);

    return {
      data
    }
  },

  // Update Task By Id
  updateTaskById: async(taskData, taskId) => {
    const {id_project, nama_task, id_user, tgl_mulai_task, tgl_akhir_task, status_task} = taskData;

    const query = `
      UPDATE task SET id_project=?, nama_task = ?, id_user=?, tgl_mulai_task=?, tgl_akhir_task=?, status_task=? WHERE id_task = ?
    `;
    
    const [result] = await sequelize.query(query, {
      replacements: [parseInt(id_project), nama_task, parseInt(id_user), tgl_mulai_task, tgl_akhir_task, status_task, taskId]
    });

    return result.affectedRows > 0;
  },

  // Delete Task By Id
  deleteTaskById: async(taskId) => {
    const query = `
      DELETE FROM task WHERE id_task = ?
    `;

    const [result] = await sequelize.query(query, {
      replacements: [taskId]
    });

    return result.affectedRows > 0;
  },
}

export default Task