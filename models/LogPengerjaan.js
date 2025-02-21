import sequelize from "../config/config.js";

const LogPengerjaan = {
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