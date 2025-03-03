import sequelize from "../config/config.js";

const Pengerjaan = {
  countPengerjaanByIdUser: async(idUser) => {
    try {
      const query = `
      SELECT task.id_user, COUNT(pengerjaan.id_pengerjaan) AS total_pengerjaan
      FROM task
      JOIN pengerjaan ON task.id_task = pengerjaan.id_task
      WHERE task.id_user = ?
      GROUP BY task.id_user
      `  

      const [count] = await sequelize.query(query, {
        replacements: [idUser],
        type: sequelize.QueryTypes.SELECT,
      })

      return {
        total: count?.total_pengerjaan || 0
      }
    } catch (error) {
      throw new Error("Error fetching data: "+error.message)
    }
  },

  getAllPengerjaans: async() => {
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
  
      const data = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      });
  
      return {
        data,
        total: resultCount.total
      }
    } catch (error) {
      throw new Error("Error fetching data: "+error.message)
    }
  },

  getAllPengerjaan: async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    try {
      const query = `
      SELECT
          pengerjaan.id_pengerjaan, pengerjaan.id_task, pengerjaan.file_github, pengerjaan.file_ss,
          task.nama_task, task.status_task
      FROM pengerjaan 
      LEFT JOIN task ON pengerjaan.id_task = task.id_task
      LIMIT :limit OFFSET :offset
      `;      

      const data = await sequelize.query(query, {
        replacements: {
          limit: limit,
          offset: offset
        }
      })

      return data[0]
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

    return data;
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
      id: result,
      ...pengerjaanData
    }
  },

  updatePengerjaanByPengerjaanIdUser: async (pengerjaanData, idPengerjaan) => {
    const {id_task, file_github, file_ss} = pengerjaanData;
    
    const query = `
      UPDATE pengerjaan SET id_task = ?, file_github = ?, file_ss = ?
        WHERE id_pengerjaan = ?
    `;

    const [result] = await sequelize.query(query, {
      replacements: [parseInt(id_task), file_github, file_ss, idPengerjaan]
    });

    return {
      result: result.info,
      id_pengerjaan: idPengerjaan,
      ...pengerjaanData
    }
  },
}

export default Pengerjaan;