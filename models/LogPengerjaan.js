import sequelize from "../config/config.js";

const LogPengerjaan = {
  getAllLogPengerjaanByUser: async(userId) => {
    try {
      const query = `
      SELECT 
      lp.id_log_pengerjaan, lp.id_pengerjaan, lp.catatan, lp.jenis_catatan, lp.tgl_pengerjaan,
      p.id_task, p.file_github, p.file_ss,
      t.nama_task, t.tgl_mulai_task, t.tgl_akhir_task, t.status_task,
      pr.nama_project,
      u.username, u.nama_lengkap
      FROM log_pengerjaan lp
      JOIN pengerjaan p ON lp.id_pengerjaan = p.id_pengerjaan
      JOIN task t ON p.id_task = t.id_task
      JOIN project pr ON t.id_project = pr.id_project
      JOIN \`user\` u ON t.id_user = u.id_user
      WHERE u.id_user = ?
      ORDER BY lp.tgl_pengerjaan DESC
      `;

      const countQuery = `
      SELECT COUNT(*) AS total 
      FROM log_pengerjaan lp
      JOIN pengerjaan p ON lp.id_pengerjaan = p.id_pengerjaan
      JOIN task t ON p.id_task = t.id_task
      JOIN project pr ON t.id_project = pr.id_project
      JOIN \`user\` u ON t.id_user = u.id_user
      WHERE u.id_user = ?
      `

      const [count] = await sequelize.query(countQuery, {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      }) 

      const result = await sequelize.query(query, {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT
      });

      return result
      
    } catch (error) {
      throw new Error("Error message: "+error.message)
    }
  },

  getAllLogPengerjaan: async() => {
    try {
      const query = `
        SELECT * FROM log_pengerjaan
      `;
      const queryCount = `
        SELECT COUNT(*) as total FROM log_pengerjaan
      `;

      const result = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      });

      const [resultCount] = await sequelize.query(queryCount, {
        type: sequelize.QueryTypes.SELECT
      });
      
      return {
        result,
        total: resultCount.total
      }
    } catch (error) {
      throw new Error("Error message: "+error.message);
    }
  },

  getLogPengerjaanByIdLog: async(logId) => {
    const query = `
      SELECT * FROM log_pengerjaan WHERE id_log_pengerjaan = ?
    `;
    
    const result = await sequelize.query(query, {
      replacements: [logId]
    });

    return result[0];
  },

  getLogPengerjaanByIdPengerjaan: async(pengerjaanId) => {
    const query = `
      SELECT * FROM log_pengerjaan WHERE id_pengerjaan = ?
    `;
  
    const result = await sequelize.query(query, {
      replacements: [pengerjaanId]
    });

    return result[0];
  },

  getDetailLogPengerjaan: async(logId, pengerjaanId) => {
    const query = `
      SELECT * FROM log_pengerjaan WHERE id_pengerjaan = ? AND id_log_pengerjaan = ?
    `;
  
    const result = await sequelize.query(query, {
      replacements: [pengerjaanId, logId]
    });

    return result[0];
  },

  addLogPengerjaan: async(id_pengerjaan, logData) => {
    const {catatan, jenis_catatan, tgl_pengerjaan} = logData;

    const query = `
      INSERT INTO log_pengerjaan (id_pengerjaan, catatan, jenis_catatan, tgl_pengerjaan)
        VALUES(?, ?, ?, ?)
    `;

    const [data] = await sequelize.query(query, {
      replacements: [parseInt(id_pengerjaan), catatan, jenis_catatan, tgl_pengerjaan]
    });

    return {
      id: data.insertId,
      ...logData,
    }
  },

};

export default LogPengerjaan;