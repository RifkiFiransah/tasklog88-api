import sequelize from "../config/config.js";

const Pengerjaan = {
  getAllPengerjaan: async() => {
    try {
      const query = `
        SELECT
          pengerjaan.id_pengerjaan, pengerjaan.id_task, pengerjaan.file_github, pengerjaan.file_ss,
          task.nama_task, task.status_task
        FROM pengerjaan 
        LEFT JOIN task ON pengerjaan.id_task = task.id_task
      `;
  
      const countQuery = `
        SELECT COUNT(*) as total FROM pengerjaan
      `;
  
      const [resultCount] = await sequelize.query(countQuery, {
        type: sequelize.QueryTypes.SELECT
      });
  
      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      });
  
      return {
        result,
        total: resultCount.total
      }
    } catch (error) {
      throw new Error("Error fetching data: "+error.message)
    }
  },

  getPengerjaanById: async(pengerjaanId) => {
    const query = `
      SELECT 
        pengerjaan.id_pengerjaan, pengerjaan.id_task, pengerjaan.file_github, pengerjaan.file_ss,
          task.nama_task, task.status_task
      FROM pengerjaan
        LEFT JOIN task ON pengerjaan.id_task = task.id_task
      WHERE id_pengerjaan = ?
    `;
    const data = await sequelize.query(query, {
      replacements: [pengerjaanId],
      type: sequelize.QueryTypes.SELECT
    });

    return data[0];
  },
 
  getPengerjaanByTaskId: async(taskId) => {
    const query = `
      SELECT 
        pengerjaan.id_pengerjaan, pengerjaan.id_task, pengerjaan.file_github, pengerjaan.file_ss,
          task.nama_task, task.status_task
      FROM pengerjaan
        LEFT JOIN task ON pengerjaan.id_task = task.id_task
      WHERE pengerjaan.id_task = ?
    `;
    const data = await sequelize.query(query, {
      replacements: [taskId],
      type: sequelize.QueryTypes.SELECT
    });

    return data[0];
  },
 
  getDetailPengerjaanByTaskId: async(taskId, pengerjaanId) => {
    const query = `
      SELECT 
        pengerjaan.id_pengerjaan, pengerjaan.id_task, pengerjaan.file_github, pengerjaan.file_ss,
          task.nama_task, task.status_task
      FROM pengerjaan
        LEFT JOIN task ON pengerjaan.id_task = task.id_task
      WHERE pengerjaan.id_task = ? AND pengerjaan.id_pengerjaan = ?
    `;
    const data = await sequelize.query(query, {
      replacements: [taskId, pengerjaanId],
      type: sequelize.QueryTypes.SELECT
    });

    return data[0];
  },

  addPengerjaan: async(pengerjaanData) => {
    const {id_task, file_github, file_ss} = pengerjaanData

    const query = `
    INSERT INTO pengerjaan (id_task, file_github, file_ss) VALUES (?, ?, ?)
    `;

    const [result] = await sequelize.query(query, {
      replacements: [parseInt(id_task), file_github, file_ss]
    })

    return {
      id: result.insertId,
      ...pengerjaanData
    }
  },
}

export default Pengerjaan;